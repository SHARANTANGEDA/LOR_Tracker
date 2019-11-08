from datetime import datetime

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import *


class StudentProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentDetails
		fields = ['student_id', 'full_name', 'email', 'phone', 'cgpa', 'graduation_status', 'degree']


class GetPictureSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentProfilePicture
		fields = ['picture']


class GetFacultyListSerializer(serializers.ModelSerializer):
	class Meta:
		model = AppUser
		fields = ['id', 'email', 'first_name', 'last_name', 'department_name']


class ViewAppliedFacultyListSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields = ['lor_id', 'faculty_id', 'courses_done', 'projects_done', 'thesis_done', 'status', 'others',
				  'application_status']


class ViewSavedLor(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['id', 'purpose', 'others_details', 'university_name', 'deadline', 'program_name', 'expired', 'created_at']


class GetAppliedLor(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields =  ['lor_id', 'faculty_id']


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
		entry = StudentDetails.objects.create(
			student_id=validated_data['student_id'],
			full_name=validated_data['full_name'],
			email=validated_data['email'],
			phone=validated_data['phone'],
			cgpa=validated_data['cgpa'],
			graduation_status=validated_data['graduation_status'],
			picture=validated_data['picture'],
			degree=validated_data['degree'],
			user=AppUser.objects.get(id=self.context['request'].user.id)
		)
		return entry

	def update(self, instance, validated_data):
		instance.student_id = validated_data.get('student_id', instance.student_id)
		instance.full_name = validated_data.get('full_name', instance.full_name)
		instance.email = validated_data.get('email', instance.email)
		instance.phone = validated_data.get('phone', instance.phone)
		instance.cgpa = validated_data.get('cgpa', instance.cgpa)
		instance.graduation_status = bool(validated_data.get('graduation_status', instance.graduation_status))
		instance.picture = validated_data.get('picture', instance.picture)
		instance.degree = validated_data.get('degree', instance.degree)
		instance.save()
		return instance


class ProfilePictureSerializer(serializers.ModelSerializer):
	class Meta:
		model = StudentProfilePicture
		fields = ['picture']

	def create(self, validated_data):
		entry = StudentProfilePicture.objects.create(
			picture=validated_data['picture'],
			user=AppUser.objects.get(id=self.context['request'].user.id)
		)
		return entry

	def update(self, instance, validated_data):
		instance.picture = validated_data.get('picture', instance.picture)
		instance.save()
		return instance


class CreateLorRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['purpose', 'others_details', 'university_name', 'deadline', 'program_name']

	def create(self, validated_data):
		print(type(validated_data['deadline'].replace(tzinfo=None)), type(datetime.now().replace(tzinfo=None)))
		if validated_data['deadline'].replace(tzinfo=None) <= datetime.now().replace(tzinfo=None):
			errors = {
				"deadline": 'Invalid deadline'}
			raise ValidationError(errors)
		else:
			entry = Lor.objects.create(
				purpose=validated_data['purpose'],
				others_details=validated_data['others_details'],
				university_name=validated_data['university_name'],
				# portal_address=validated_data['portal_address'],
				deadline=validated_data['deadline'],
				program_name=validated_data['program_name'],
				user=AppUser.objects.get(id=self.context['request'].user.id)
			)
			print("Create: ", entry)
			return entry


class EditLorRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['purpose', 'others_details', 'university_name', 'deadline', 'program_name', 'expired']

	def update(self, instance, validated_data):
		if validated_data.get('deadline', instance.deadline).replace(tzinfo=None) <= datetime.now().replace(tzinfo=None):
			errors = {
				"deadline": 'Invalid deadline'}
			raise ValidationError(errors)
		else:
			instance.purpose = validated_data.get('purpose', instance.purpose)
			instance.others_details = validated_data.get('others_details', instance.others_details)
			instance.university_name = validated_data.get('university_name', instance.university_name)
			instance.deadline = validated_data.get('deadline', instance.deadline)
			instance.program_name = validated_data.get('program_name', instance.program_name)
			instance.save()
			return instance


class AddFacultyToLorSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields = ['lor_id', 'faculty_id', 'courses_done', 'projects_done', 'thesis_done', 'status', 'others']

	def create(self, validated_data):
		print('DATA:', validated_data)
		# validate_lor_submission(data=validated_data)
		entry = FacultyListLor.objects.create(
			lor_id=validated_data['lor_id'],
			faculty_id=validated_data['faculty_id'],
			projects_done=validated_data['projects_done'],
			thesis_done=validated_data['thesis_done'],
			courses_done=validated_data['courses_done'],
			status=validated_data['status'],
			others=validated_data['others']
		)
		print("HERE", entry)
		return entry


class EditSubmittedLorDetailsSerializer(serializers.ModelSerializer):
	class Meta:
		model = FacultyListLor
		fields = ['courses_done', 'projects_done', 'thesis_done', 'status', 'others']

	def update(self, instance, validated_data):
		print('DATA:', validated_data)
		# validate_lor_submission(data=validated_data)
		instance.projects_done = validated_data.get('projects_done', instance.projects_done)
		instance.thesis_done = validated_data.get('thesis_done', instance.thesis_done)
		instance.courses_done = validated_data.get('courses_done', instance.courses_done)
		instance.status = validated_data.get('status', instance.status)
		instance.others = validated_data.get('others', instance.others)
		instance.save()
		return instance
