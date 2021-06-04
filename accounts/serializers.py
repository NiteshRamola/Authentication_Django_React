from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import fields

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer):
        model = User
        fields = ('id', 'email', 'first_name', 'password', 'last_name')
