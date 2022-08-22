from wsgiref.util import FileWrapper

try:
    from hmac import compare_digest
except ImportError:
    def compare_digest(a, b):
        return a == b

from django.contrib.auth import login
from django.contrib.auth.signals import user_logged_out
from django.http import HttpResponse
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
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer


import binascii
import os
import shutil
import subprocess
import zipfile


class UserCreate(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data.update({"money": 10})

        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        headers["Access-Control-Allow-Origin"] = "*"

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLogin(KnoxLoginView):
    # authentication_classes = [BasicAuthentication]
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)
        temp_list = super(UserLogin, self).post(request, format=None)
        headers = {"Access-Control-Allow-Origin": "*"}

        return Response({"data": temp_list.data}, headers=headers)


class UserLogout(KnoxLogoutView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
        headers = {"Access-Control-Allow-Origin": "*"}
        return Response(None, status=status.HTTP_204_NO_CONTENT, headers=headers)


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


class DownloadCleo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def zipdir(self, path, ziph):
        for root, dirs, files in os.walk(path):
            for file in files:
                if file == "CLEO_V5.jar":
                    ziph.write(os.path.join(root, file), file)

    def post(self, request):
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        token = hash_token(token)
        cleo_license = False if AuthToken.objects.filter(digest=token)[0].user.get_cleo_license() == "False" else True
        user = AuthToken.objects.filter(digest=token)[0].user.get_username()
        if cleo_license:
            directory = os.getcwd()
            directory_name = fr"{directory}\files\{user}"
            zip_file = zipfile.ZipFile(rf"{directory_name}\CLEO_V5.zip", 'w', zipfile.ZIP_DEFLATED)
            os.chdir("../CLEO/")
            self.zipdir(os.getcwd(), zip_file)
            zip_file.close()
            os.chdir("../backend/")
            return HttpResponse(
                open(rf"{directory_name}\CLEO_V5.zip", 'rb').read(),
                content_type="application/zip"
            )
            # return Response(None, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_403_FORBIDDEN)


class RunCleo(APIView):
    # authentication_classes = (TokenAuthentication,)
    authentication_classes = []
    # permission_classes = (IsAuthenticated,)

    def zipdir(self, path, ziph):
        for root, dirs, files in os.walk(path):
            for file in files:
                if file == "Results.txt" or file == "MAO00-20150319-DICOM_Tb.tif":
                    ziph.write(os.path.join(root, file), file)

    def post(self, request):
        ok = self.authenticate(request)
        if ok:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token = hash_token(token)
            user = AuthToken.objects.filter(digest=token)[0].user.get_username()

            if len(request.FILES) != 2:
                return Response(None, status=status.HTTP_400_BAD_REQUEST)
            check_files_names_1 = request.data.get("firstFileName") != "BMDvalues.txt"
            check_files_names_2 = request.data.get("secondFileName") != "Phantom1.txt"
            check_files_names = check_files_names_1 or check_files_names_2
            if check_files_names:
                return Response(None, status=status.HTTP_400_BAD_REQUEST)

            first_file = request.FILES['firstFile']
            second_file = request.FILES['secondFile']
            first_file_name = request.data.get("firstFileName")
            second_file_name = request.data.get("secondFileName")
            directory = os.getcwd()
            directory_name = fr"{directory}\files\{user}"

            try:
                os.mkdir(directory_name)
            except (FileExistsError, FileNotFoundError):
                pass

            first_file_name = directory_name + "\\" + first_file_name
            second_file_name = directory_name + "\\" + second_file_name

            with open(first_file_name, 'wb+') as temp_file:
                for chunk in first_file.chunks():
                    temp_file.write(chunk)

            with open(second_file_name, 'wb+') as temp_file:
                for chunk in second_file.chunks():
                    temp_file.write(chunk)

            os.chdir("../CLEO/")
            cleo_run = subprocess.Popen(["java", "-jar", r".\CLEO_V5.jar", r".\data\export-0000.dcm",
                                         rf"..\backend\files\{user}\BMDvalues.txt",
                                         rf"..\backend\files\{user}\Phantom1.txt"], shell=False,
                                        stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
            cleo_run.wait()
            shutil.move("./Results.txt", rf"{directory_name}\Results.txt")
            shutil.move('./MAO00-20150319-DICOM_Tb.tif', rf"{directory_name}\MAO00-20150319-DICOM_Tb.tif")
            os.chdir(directory)

            zip_file = zipfile.ZipFile(rf"{directory_name}\results.zip", 'w', zipfile.ZIP_DEFLATED)
            self.zipdir(directory_name, zip_file)
            zip_file.close()

            # return Response(None, status=status.HTTP_200_OK)
            return HttpResponse(
                open(rf"{directory_name}\results.zip", 'rb').read(),
                content_type="application/zip"
            )
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
