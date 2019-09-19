from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView
from .models import *
from .permissions import HasGroupPermission
from django.core.exceptions import ObjectDoesNotExist


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
		print("data:", request.data)
		try:
			existing = StudentDetails.objects.get(user=self.request.user.id)
			serializer = self.get_serializer(existing, data=request.data)
			serializer.is_valid(raise_exception=True)
			student_details = serializer.save()
			return Response({
				"profile": StudentProfileSerializer(student_details, context=self.get_serializer_context()).data,
			})
		except ObjectDoesNotExist:
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
		serializer.is_valid(raise_exception=True)
		lor_details = serializer.save()
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
		return Response(ViewSavedLor(entries, many=True).data)


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
		entries=list(entries)
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


# View Saved Lor
class GetAppliedLor(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	# permission_classes = (permissions.AllowAny,)
	required_groups = {
		'GET': ["student"],
	}
	serializer_class = ViewAppliedFacultyListSerializer

	def get(self, request):
		print(request.user.id)
		entries = Lor.objects.filter(user=self.request.user.id)
		result = []
		for entry in entries:
			applied = FacultyListLor.objects.filter(lor_id=entry.id)
			result.append(applied)
		return Response(ViewAppliedFacultyListSerializer(result, many=True).data)
