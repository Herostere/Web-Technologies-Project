from django.contrib.auth.hashers import make_password
from django.core import exceptions
from .models import User
from rest_framework import serializers

import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    money = serializers.HiddenField(default=10)
    cleo_license = serializers.HiddenField(default=False)

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
            'money',
            'cleo_license',
            'title',
            'zip_code',
            'address',
            'company'
        )

    def validate(self, data):
        # here data has all the fields which have validated values
        # so we can create a User instance out of it
        user = User(**data)

        # get the password from the data
        password = data.get('password')

        errors = dict()
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password, user=user)
            password = make_password(data.get('password'))
            data["password"] = password

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(UserSerializer, self).validate(data)
