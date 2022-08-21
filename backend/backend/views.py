from django.contrib.auth import login
from django.contrib.auth.signals import user_logged_out
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from .models import User
from rest_framework.authentication import BasicAuthentication
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import UserSerializer


class UserCreate(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.data)
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
