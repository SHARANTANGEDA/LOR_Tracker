from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView
from .models import *
from .permissions import HasGroupPermission
from django.core.exceptions import ObjectDoesNotExist
from .validations.validate_lor_submission import validate_lor_submission
import json
from django.core.serializers import serialize
from datetime import datetime, timezone


# Edit my profile
class EditProfile(generics.GenericAPIView):
	# print('here', TokenAuthentication.)
	# authentication_classes = (TokenAuthentication,)
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'POST': ['student'],
	}
	serializer_class = CreateProfileSerializer

	def post(self, request, *args, **kwargs):
		try:
			existing = StudentDetails.objects.get(user=self.request.user.id)
			serializer = self.get_serializer(existing, data=request.data)
			serializer.is_valid(raise_exception=True)
			student_details = serializer.save()
			return Response({
				"profile": StudentProfileSerializer(student_details, context=self.get_serializer_context()).data,
			})
		except ObjectDoesNotExist as notCreated:
			serializer = self.get_serializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			student_details = serializer.save()
			return Response({
				"profile": StudentProfileSerializer(student_details, context=self.get_serializer_context()).data,
			})


# View profile
class GetMyProfile(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["student"],
	}
	serializer_class = StudentProfileSerializer

	def get(self, request):
		try:
			entries = StudentDetails.objects.get(user=self.request.user.id)
			return Response(StudentProfileSerializer(entries).data)
		except ObjectDoesNotExist:
			return Response({'status': False})


# Create an LOR Application
class CreateLor(generics.GenericAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'POST': ['student'],
	}
	serializer_class = CreateLorRequestSerializer

	def post(self, request, *args, **kwargs):
		print("Data: ", request.data)
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		lor_details = serializer.save()
		return Response({
			"lor": ViewSavedLor(lor_details, context=self.get_serializer_context()).data,
		})


# Add Faculty Recipient for LOR
class AddFacultyForLOR(generics.GenericAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'POST': ['student'],
	}
	serializer_class = AddFacultyToLorSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data, many=True)
		print('received:', request.data)
		validate_lor_submission(data=request.data)
		entries = []
		# TODO Check for Integrity Errors
		for validated_data in request.data:
			entry = FacultyListLor.objects.create(
				lor_id=validated_data['lor_id'],
				faculty_id=validated_data['faculty_id'],
				courses_done=validated_data['courses_done'],
				projects_done=validated_data['projects_done'],
				thesis_done=validated_data['thesis_done'],
				status=validated_data['status'],
				others=validated_data['others']
			)
			entries.append(entry)
		# serializer.is_valid(raise_exception=True)
		# lor_details = serializer.save()
		print('SUCCESS')
		return Response({"success": True})


# View Saved Lor
class GetMySavedLor(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['student'],
	}
	serializer_class = ViewSavedLor

	def get(self, request):
		entries = Lor.objects.filter(user=self.request.user.id)
		for item in entries:
			if item.deadline - datetime.now(timezone.utc) <= 0:
				Lor.objects.get(id=item.id).delete()
		new_entries = Lor.objects.filter(user=self.request.user.id)
		return Response(ViewSavedLor(new_entries, many=True).data)


class GetAppliedLor(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['student'],
	}
	serializer_class = ViewAppliedFacultyListSerializer

	def get(self, request):
		entries = Lor.objects.filter(user=self.request.user.id)
		result = []
		for entry in entries:
			str_data = serialize('json', FacultyListLor.objects.filter(lor=entry.id))
			data = json.loads(str_data)
			for item in data:
				item["fields"]["lor"] = json.loads(serialize('json', Lor.objects.filter(id=item["fields"]["lor"])))[0][
					"fields"]
				# item["fields"]["faculty"] = json.loads(
				# 	serialize('json',
				# 			  AppUser.objects.values("id", "email", "first_name", "last_name", "department_name")
				# 			  .filter(id=item["fields"]["faculty"])))[0]["fields"]
				item["fields"]["faculty"] = AppUser.objects.values("id",
																   "email", "first_name", "last_name",
																   "department_name").filter(
					id=item["fields"]["faculty"])[0]
				result.append(item["fields"])

		print(result)
		return Response(result)


# List of Universities in database
class GetUnivList(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['student'],
	}
	serializer_class = GetUnivListSerializer

	def get(self, request):
		entries = Lor.objects.order_by('university_name').values('university_name').distinct()
		print('University: ', entries)
		entries = list(entries)
		print('UniversityList: ', entries)
		# return Response(GetUnivListSerializer(entries, many=True).data)
		return Response(entries)


# Get Faculty list
class GetFacultyList(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['student'],
	}
	serializer_class = GetFacultyListSerializer

	def get(self, request):
		entries = AppUser.objects.filter(role='faculty')
		print(entries)
		return Response(GetFacultyListSerializer(entries, many=True).data)
