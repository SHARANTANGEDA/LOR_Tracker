from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from django.db import models


class StudentProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentDetails
		fields = ['full_name', 'email', 'phone', 'cgpa', 'student_id',  'graduation_status', 'degree']


class GetFacultyListSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['id', 'email', 'first_name', 'last_name', 'department_name']


class ViewAppliedFacultyListSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields = ['lor_id', 'faculty_id']


class ViewSavedLor(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['id', 'purpose', 'others_details', 'university_name', 'portal_address', 'deadline', 'program_name']


class GetUnivListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['university_name']


class ViewAppliedLor(serializers.ModelSerializer):
	lor = ViewSavedLor()
	faculty = GetFacultyListSerializer()


class CreateProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentDetails
		fields = ['student_id', 'full_name', 'email', 'phone', 'cgpa', 'graduation_status', 'degree']

	def create(self, validated_data):
		entry = StudentDetails.objects.update_or_create(
			student_id=validated_data['student_id'],
			full_name=validated_data['full_name'],
			email=validated_data['email'],
			phone=validated_data['phone'],
			cgpa=validated_data['cgpa'],
			graduation_status=validated_data['graduation_status'],
			degree=validated_data['degree'],
			user=AppUser.objects.get(id=self.context['request'].user.id)
		)
		print(entry)
		return entry

	def update(self, instance, validated_data):
		instance.student_id = validated_data.get('student_id', instance.student_id)
		instance.full_name = validated_data.get('full_name', instance.full_name)
		instance.email = validated_data.get('email', instance.email)
		instance.phone = validated_data.get('phone', instance.phone)
		instance.cgpa = validated_data.get('cgpa', instance.cgpa)
		instance.graduation_status = bool(validated_data.get('graduation_status', instance.graduation_status))
		instance.degree = validated_data.get('degree', instance.degree)
		instance.save()
		return instance


class CreateLorRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['purpose', 'others_details', 'university_name', 'portal_address', 'deadline', 'program_name']

	def create(self, validated_data):
		entry = Lor.objects.create(
			purpose=validated_data['purpose'],
			others_details=validated_data['others_details'],
			university_name=validated_data['university_name'],
			portal_address=validated_data['portal_address'],
			deadline=validated_data['deadline'],
			program_name=validated_data['program_name'],
			user=AppUser.objects.get(id=self.context['request'].user.id)
		)
		print("Create: ", entry)
		return entry


class AddFacultyToLorSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields = ['lor_id', 'faculty_id']

	def create(self, validated_data):
		print(validated_data)
		print("Lor: ", validated_data['lor_id'])
		print("FAc: ", validated_data['faculty_id'])
		entry = FacultyListLor.objects.create(
			lor_id=validated_data['lor_id'],
			faculty_id=validated_data['faculty_id']
		)
		return entry
