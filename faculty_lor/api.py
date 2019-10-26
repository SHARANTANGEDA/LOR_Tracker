from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers import serialize
from student_lor.permissions import HasGroupPermission
from student_lor.models import *
import json
from datetime import datetime, timezone
from django.template import Template, Context
from django.core.mail import send_mail
from django.contrib.sessions.models import Session

# Edit my profile
# class EditProfile(generics.GenericAPIView):
# 	# print('here', TokenAuthentication.)
# 	# authentication_classes = (TokenAuthentication,)
# 	permission_classes = [
# 		permissions.IsAuthenticated,
# 		HasGroupPermission
# 	]
# 	required_groups = {
# 		'POST': ['student'],
# 	}
# 	serializer_class = CreateProfileSerializer
#
# 	def post(self, request, *args, **kwargs):
# 		print("data:", request.data)
# 		try:
# 			existing = StudentDetails.objects.get(user=self.request.user.id)
# 			serializer = self.get_serializer(existing, data=request.data)
# 			serializer.is_valid(raise_exception=True)
# 			student_details = serializer.save()
# 			return Response({
# 				"profile": student_details
# 			})
# 		except ObjectDoesNotExist:
# 			serializer = self.get_serializer(data=request.data)
# 			serializer.is_valid(raise_exception=True)
# 			student_details = serializer.save()
# 			return Response({
# 				"profile": student_details
# 			})

ACCEPT_TEMPLATE = """
Dear {{student.full_name}}:

Your Letter of Recommendation request to Professor {{faculty.first_name}} {{faculty.last_name}}, has been accepted.
For further communication with the faculty, please contact {{faculty.email}}.

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""

REJECT_TEMPLATE = """
Dear {{student.full_name}}:

Your Letter of Recommendation request to Professor {{faculty.first_name}} {{faculty.last_name}}, has been rejected.
For further communication with the faculty, please contact {{faculty.email}}.

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""

COMPLETE_TEMPLATE = """
Dear {{student.full_name}}:

Your Letter of Recommendation request to Professor {{faculty.first_name}} {{faculty.last_name}}, has been completed.
Please check your related application portal.

For further communication with the faculty, please contact {{faculty.email}}.

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""
# Get Home Data for faculty
class GetHome(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = {}
		new_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='AP')
		accepted_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='AC')
		completed_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='CO')
		result["newRequests"] = len(new_requests)
		result["acceptedRequests"] = len(accepted_requests)
		result["completedRequests"] = len(completed_requests)
		deadline_content = []
		for item in accepted_requests:
			lor_details = Lor.objects.filter(id=item.lor.id)
			data = json.loads(serialize('json', lor_details))[0]["fields"]
			print(data)
			print(lor_details[0].deadline)
			diff = (datetime.now(timezone.utc) - lor_details[0].deadline).days
			if 5 >= diff >= 0:
				details = {}
				user_details = AppUser.objects.filter(id=lor_details["user"], role='student')
				details["student_details"] = json.loads(serialize('json', user_details))[0]["fields"]
				details["lor_details"] = json.loads(serialize('json', lor_details))[0]["fields"]
				deadline_content.append(details)
		result["upcomingDeadlines"] = deadline_content
		print(result)
		return Response(result)


class GetLorAcceptData(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='AP')
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
			(faculty=self.request.user.id, application_status='AP', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)


class AcceptedLorData(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='AC')
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
			(faculty=self.request.user.id, application_status='AC', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)


class AcceptLorRequest(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request, lor, faculty):
		lor_details = Lor.objects.get(id=lor)
		details = StudentDetails.objects.values("full_name", "phone").get(user=lor_details.user.id)
		student_mail = AppUser.objects.values("id", "email").get(id=lor_details.user.id)
		faculty_details = AppUser.objects.values("first_name", "last_name", "email").get(id=faculty)
		template = Template(ACCEPT_TEMPLATE)
		send_mail(
			'Your LOR Request has been Accepted',
			template.render(context=Context({'faculty': faculty_details, 'student': details})),
			'ghotden@gmail.com',
			[student_mail.email],
			fail_silently=False,
		)
		result = FacultyListLor.objects.filter(lor=lor, faculty=faculty).update(application_status='AC')
		print(lor, faculty)
		return Response(result)


class RejectLorRequest(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request, lor, faculty):
		lor_details = Lor.objects.get(id=lor)
		details = StudentDetails.objects.values("full_name", "phone").get(user=lor_details.user.id)
		student_mail = AppUser.objects.values("id", "email").get(id=lor_details.user.id)
		faculty_details = AppUser.objects.values("first_name", "last_name", "email").get(id=faculty)
		template = Template(REJECT_TEMPLATE)
		send_mail(
			'Your LOR Request has been Rejected',
			template.render(context=Context({'faculty': faculty_details, 'student': details})),
			'ghotden@gmail.com',
			[student_mail.email],
			fail_silently=False,
		)
		result = FacultyListLor.objects.filter(lor=lor, faculty=faculty).update(application_status='RE')
		print(lor, faculty)
		return Response(result)


class MarkRequestAsComplete(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request, lor, faculty):
		lor_details = Lor.objects.get(id=lor)
		details = StudentDetails.objects.values("full_name", "phone").get(user=lor_details.user.id)
		student_mail = AppUser.objects.values("id", "email").get(id=lor_details.user.id)
		faculty_details = AppUser.objects.values("first_name", "last_name", "email").get(id=faculty)
		template = Template(COMPLETE_TEMPLATE)
		send_mail(
			'Your Letter of Recommendation is Ready',
			template.render(context=Context({'faculty': faculty_details, 'student': details})),
			'ghotden@gmail.com',
			[student_mail.email],
			fail_silently=False,
		)
		result = FacultyListLor.objects.filter(lor=lor, faculty=faculty).update(application_status='CO')
		print(lor, faculty)
		return Response(result)


class CompletedLorData(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ["faculty"],
	}

	# serializer_class = StudentProfileSerializer
	def get(self, request):
		result = []
		new_requests = FacultyListLor.objects.filter(faculty=self.request.user.id, application_status='CO')
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
			(faculty=self.request.user.id, application_status='CO', lor=item.lor.id)))[0]["fields"]
			result.append(details)
		print(result)
		return Response(result)
