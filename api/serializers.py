from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.db import models


class LoginSerializer(serializers.ModelSerializer):
	email = serializers.CharField()
	password = serializers.CharField()

	class Meta:
		model = AppUser
		fields = ['email', 'password']

	def validate(self, data):
		user = authenticate(**data)
		if user:
			return user
		raise serializers.ValidationError("Incorrect Credentials")


class PayloadSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['id', 'email', 'role']


class RegisterFacultySerializers(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['first_name', 'last_name', 'email', 'password', 'department_name']
		extra_kwargs = {"password": {"write_only": True}}

	def create(self, validated_data):
		user = AppUser.objects.create_user(
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name'],
			email=validated_data['email'],
			password=validated_data['password'],
			department_name=validated_data['department_name'],
			role='faculty'
		)
		return user


class RegisterHodSerializers(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['first_name', 'last_name', 'email', 'password', 'department_name']
		extra_kwargs = {"password": {"write_only": True}}

	def create(self, validated_data):
		user = AppUser.objects.create_user(
			email=validated_data['email'],
			password=validated_data['password'],
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name'],
			department_name=validated_data['department_name'],
			role='hod'
		)
		return user


class RegisterAdminSerializers(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['first_name', 'last_name', 'email', 'password', 'department_name']
		extra_kwargs = {"password": {"write_only": True}}

	def create(self, validated_data):
		user = AppUser.objects.create_user(
			email=validated_data['email'],
			password=validated_data['password'],
			first_name=validated_data['first_name'],
			last_name=validated_data['last_name'],
			department_name=validated_data['department_name'],
			role='admin'
		)
		return user

