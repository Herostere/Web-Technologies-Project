try:
    from hmac import compare_digest
except ImportError:
    def compare_digest(a, b):
        return a == b

from django.contrib.auth import login
from django.contrib.auth.signals import user_logged_out
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from knox.auth import TokenAuthentication
from knox.crypto import hash_token
from knox.models import AuthToken
from knox.settings import CONSTANTS, knox_settings
from knox.signals import token_expired
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from .models import User
from rest_framework import exceptions
from rest_framework import status
from rest_framework.authentication import get_authorization_header
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer


import binascii
import os


class UserCreate(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data.update({"money": 10})

        return self.create(request, *args, **kwargs)


class UserLogin(KnoxLoginView):
    # authentication_classes = [BasicAuthentication]
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)
        temp_list = super(UserLogin, self).post(request, format=None)

        return Response({"data": temp_list.data})


class UserLogout(KnoxLogoutView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class UserCheck(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        ok = self.authenticate(request)
        if ok:
            return Response(None, status=status.HTTP_200_OK)
        return Response(None, status=status.HTTP_403_FORBIDDEN)

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        prefix = knox_settings.AUTH_HEADER_PREFIX.encode()

        if not auth:
            return None
        if auth[0].lower() != prefix.lower():
            # Authorization header is possibly for another backend
            return None
        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. '
                    'Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)

        user, auth_token = self.authenticate_credentials(auth[1])
        return user, auth_token

    def authenticate_credentials(self, token):
        msg = _('Invalid token.')
        token = token.decode("utf-8")
        for auth_token in AuthToken.objects.filter(
                token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH]):
            if self._cleanup_token(auth_token):
                continue

            try:
                digest = hash_token(token)
            except (TypeError, binascii.Error):
                raise exceptions.AuthenticationFailed(msg)
            if compare_digest(digest, auth_token.digest):
                if knox_settings.AUTO_REFRESH and auth_token.expiry:
                    self.renew_token(auth_token)
                return self.validate_user(auth_token)
        raise exceptions.AuthenticationFailed(msg)

    def _cleanup_token(self, auth_token):
        for other_token in auth_token.user.auth_token_set.all():
            if other_token.digest != auth_token.digest and other_token.expiry:
                if other_token.expiry < timezone.now():
                    other_token.delete()
                    username = other_token.user.get_username()
                    token_expired.send(sender=self.__class__,
                                       username=username, source="other_token")
        if auth_token.expiry is not None:
            if auth_token.expiry < timezone.now():
                username = auth_token.user.get_username()
                auth_token.delete()
                token_expired.send(sender=self.__class__,
                                   username=username, source="auth_token")
                return True
        return False

    def renew_token(self, auth_token):
        current_expiry = auth_token.expiry
        new_expiry = timezone.now() + knox_settings.TOKEN_TTL
        auth_token.expiry = new_expiry
        # Throttle refreshing of token to avoid db writes
        delta = (new_expiry - current_expiry).total_seconds()
        if delta > knox_settings.MIN_REFRESH_INTERVAL:
            auth_token.save(update_fields=('expiry',))

    def validate_user(self, auth_token):
        if not auth_token.user.is_active:
            raise exceptions.AuthenticationFailed(
                _('User inactive or deleted.'))
        return auth_token.user, auth_token


class RunCleo(APIView):
    # authentication_classes = (TokenAuthentication,)
    authentication_classes = []
    # permission_classes = (IsAuthenticated,)
    # parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        ok = self.authenticate(request)
        if ok:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token = hash_token(token)
            user = AuthToken.objects.filter(digest=token)[0].user.get_username()

            my_file = request.FILES['myFile']
            my_file_name = request.data.get("fileName")
            directory = os.getcwd()
            directory_name = f"{directory}\\files\\{user}"

            try:
                os.mkdir(directory_name)
            except FileExistsError:
                pass

            file_name = directory_name + "\\" + my_file_name
            print(file_name)

            with open(file_name, 'wb+') as temp_file:
                for chunk in my_file.chunks():
                    temp_file.write(chunk)

            return Response(None, status=status.HTTP_200_OK)
        return Response(None, status=status.HTTP_403_FORBIDDEN)


    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        prefix = knox_settings.AUTH_HEADER_PREFIX.encode()

        if not auth:
            return None
        if auth[0].lower() != prefix.lower():
            # Authorization header is possibly for another backend
            return None
        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. '
                    'Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)

        user, auth_token = self.authenticate_credentials(auth[1])
        return user, auth_token

    def authenticate_credentials(self, token):
        msg = _('Invalid token.')
        token = token.decode("utf-8")
        for auth_token in AuthToken.objects.filter(
                token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH]):
            if self._cleanup_token(auth_token):
                continue

            try:
                digest = hash_token(token)
            except (TypeError, binascii.Error):
                raise exceptions.AuthenticationFailed(msg)
            if compare_digest(digest, auth_token.digest):
                if knox_settings.AUTO_REFRESH and auth_token.expiry:
                    self.renew_token(auth_token)
                return self.validate_user(auth_token)
        raise exceptions.AuthenticationFailed(msg)

    def _cleanup_token(self, auth_token):
        for other_token in auth_token.user.auth_token_set.all():
            if other_token.digest != auth_token.digest and other_token.expiry:
                if other_token.expiry < timezone.now():
                    other_token.delete()
                    username = other_token.user.get_username()
                    token_expired.send(sender=self.__class__,
                                       username=username, source="other_token")
        if auth_token.expiry is not None:
            if auth_token.expiry < timezone.now():
                username = auth_token.user.get_username()
                auth_token.delete()
                token_expired.send(sender=self.__class__,
                                   username=username, source="auth_token")
                return True
        return False

    def renew_token(self, auth_token):
        current_expiry = auth_token.expiry
        new_expiry = timezone.now() + knox_settings.TOKEN_TTL
        auth_token.expiry = new_expiry
        # Throttle refreshing of token to avoid db writes
        delta = (new_expiry - current_expiry).total_seconds()
        if delta > knox_settings.MIN_REFRESH_INTERVAL:
            auth_token.save(update_fields=('expiry',))

    def validate_user(self, auth_token):
        if not auth_token.user.is_active:
            raise exceptions.AuthenticationFailed(
                _('User inactive or deleted.'))
        return auth_token.user, auth_token
