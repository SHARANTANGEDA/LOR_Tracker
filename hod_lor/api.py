from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.serializers import serialize
from student_lor.permissions import HasGroupPermission
from student_lor.models import *
import json
from django.contrib.sessions.models import Session


class GetAllRequests(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["hod", "admin"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.all()
		print(new_requests)
		for item in new_requests:
			print(item.lor.user.id)
			details = {}
			print(StudentDetails.objects.filter(user=item.lor.user), item)
			lor_details = json.loads(serialize('json', Lor.objects.filter(id=item.lor.id)))[0]["fields"]
			user_details = AppUser.objects.values("id", "email", "first_name", "last_name", "department_name").get(
				id=item.lor.user.id, role='student')
			profile_details = json.loads(serialize('json', StudentDetails.objects.filter(user=item.lor.user)))[0][
				"fields"]
			details["student_details_general"] = user_details
			details["lor_details"] = lor_details
			details["student_details_profile"] = profile_details
			details["application_details"] = json.loads(serialize('json', FacultyListLor.objects.filter
			(faculty=item.faculty.id, lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)


class GetAcceptedEntriesHod(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["hod", "admin"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(application_status='AC')
		print(new_requests)
		for item in new_requests:
			details = {}
			lor_details = json.loads(serialize('json', Lor.objects.filter(id=item.lor.id)))[0]["fields"]
			user_details = AppUser.objects.values("id", "email", "first_name", "last_name", "department_name").get(
				id=item.lor.user.id, role='student')
			profile_details = json.loads(serialize('json', StudentDetails.objects.filter(user=item.lor.user)))[0][
				"fields"]
			details["student_details_general"] = user_details
			details["lor_details"] = lor_details
			details["student_details_profile"] = profile_details
			details["application_details"] = json.loads(serialize('json', FacultyListLor.objects.filter
			(faculty=item.faculty.id, application_status='AC', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)


class GetAllNewRequestsHod(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["hod", "admin"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(application_status='AP')
		for item in new_requests:
			details = {}
			lor_details = json.loads(serialize('json', Lor.objects.filter(id=item.lor.id)))[0]["fields"]
			user_details = AppUser.objects.values("id", "email", "first_name", "last_name", "department_name").get(
				id=item.lor.user.id, role='student')
			profile_details = json.loads(serialize('json', StudentDetails.objects.filter(user=item.lor.user)))[0][
				"fields"]
			details["student_details_general"] = user_details
			details["lor_details"] = lor_details
			details["student_details_profile"] = profile_details
			details["application_details"] = json.loads(serialize('json', FacultyListLor.objects.filter
			(faculty=item.faculty.id, application_status='AP', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)


class GetAllCompletedRequestsHod(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["hod", "admin"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(application_status='CO')
		for item in new_requests:
			details = {}
			lor_details = json.loads(serialize('json', Lor.objects.filter(id=item.lor.id)))[0]["fields"]
			user_details = AppUser.objects.values("id", "email", "first_name", "last_name", "department_name").get(
				id=item.lor.user.id, role='student')
			profile_details = json.loads(serialize('json', StudentDetails.objects.filter(user=item.lor.user)))[0][
				"fields"]
			details["student_details_general"] = user_details
			details["lor_details"] = lor_details
			details["student_details_profile"] = profile_details
			details["application_details"] = json.loads(serialize('json', FacultyListLor.objects.filter
			(faculty=item.faculty.id, application_status='CO', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		return Response(result)


class GetHodHome(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["hod"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = {}
		new_requests = FacultyListLor.objects.filter(application_status='AP')
		accepted_requests = FacultyListLor.objects.filter(application_status='AC')
		completed_requests = FacultyListLor.objects.filter(application_status='CO')
		active_users = Session.objects.all()
		uid_list = []
		for session in active_users:
			data = session.get_decoded()
			print(data.get('_auth_user_id', None), str(self.request.user.id),
				  data.get('_auth_user_id', None) == str(self.request.user.id))
			if not data.get('_auth_user_id', None) == str(self.request.user.id):
				uid_list.append(data.get('_auth_user_id', None))
		current_users = AppUser.objects.values("id", "email", "first_name", "last_name", "role").filter(id__in=uid_list)
		current_users_json = []
		if not len(current_users) == 0:
			current_users_json = current_users
		faculty = AppUser.objects.filter(role='faculty')
		student = AppUser.objects.filter(role='student')
		result["newRequests"] = len(new_requests)
		result["acceptedRequests"] = len(accepted_requests)
		result["completedRequests"] = len(completed_requests)
		result["facultyCnt"] = len(faculty)
		result["studentCnt"] = len(student)
		result["activeUserCnt"] = len(current_users)
		result["activeUserContent"] = current_users_json
		return Response(result)
