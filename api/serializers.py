from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
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


class AllUsersSerializer(serializers.ModelSerializer):
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
			department_name=validated_data['department_name'],
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
			department_name=validated_data['department_name'],
			role='admin'
		)
		group, created = Group.objects.get_or_create(name='admin')
		user.groups.add(group)
		return user


class AddEntrySerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['student_id', 'college', 'dead_line', 'country', 'email', 'phone', 'cgpa', 'portal_address']

	def create(self, validated_data):
		entry = Lor.objects.create(
			student_id=validated_data['student_id'],
			college=validated_data['college'],
			dead_line=validated_data['dead_line'],
			country=validated_data['country'],
			email=validated_data['email'],
			phone=validated_data['phone'],
			cgpa=validated_data['cgpa'],
			portal_address=validated_data['portal_address'],
			faculty_id=self.context['request'].user.id
		)
		return entry
