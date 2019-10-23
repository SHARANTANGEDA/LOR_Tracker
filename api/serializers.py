from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from rest_framework.response import Response

import json
from django.db import models


class LoginSerializer(serializers.ModelSerializer):
	email = serializers.CharField()
	password = serializers.CharField()

	class Meta:
		model = AppUser
		fields = ['email', 'password']

	def validate(self, data):
		# Check Email Exists
		# error_fields = {}
		user = authenticate(**data)
		if user:
			return user
		# error_fields['email'] = "You have entered incorrect credentials, please check"
		raise serializers.ValidationError({'email': "You have entered incorrect credentials, please check"})


class PayloadSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['id', 'email', 'role', 'first_name', 'last_name']


class AllUsersSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['id', 'email', 'role']


class RegisterStudentSerializer(serializers.ModelSerializer):
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
			department_name='Computer Science and Information Systems',
			# graduation_status=validated_data['graduation_status'],
			# cgpa=validated_data['cgpa'],
			role='student'
		)
		group, created = Group.objects.get_or_create(name='student')
		user.groups.add(group)
		return user


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
			department_name='Computer Science and Information Systems',
			role='faculty'
		)
		group, created = Group.objects.get_or_create(name='faculty')
		user.groups.add(group)
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
			department_name='Computer Science and Information Systems',
			role='hod'
		)
		group, created = Group.objects.get_or_create(name='hod')
		user.groups.add(group)
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
			department_name='Computer Science and Information Systems',
			role='admin'
		)
		group, created = Group.objects.get_or_create(name='admin')
		user.groups.add(group)
		return user
