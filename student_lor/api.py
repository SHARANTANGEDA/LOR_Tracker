# Create your views here.
import json
from datetime import datetime, timezone

from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.core.serializers import serialize
from django.template import Template, Context
from rest_framework import permissions, generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .permissions import HasGroupPermission
from .serializers import *
from .validations.validate_lor_submission import validate_lor_submission

WITHDRAW_TEMPLATE = """
Dear {{faculty.first_name}} {{faculty.last_name}}:

The Letter of Recommendation request from {{student.full_name}}, has been withdrawn by the student.

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""
APPLICATION_TEMPLATE = """
Dear {{faculty.first_name}} {{faculty.last_name}}:

You got a new Letter of Recommendation request from {{student.full_name}}, it has to be filled by {{deadline}} if you accept it.
To accept the request please visit the department website

Thank You,

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""
EDITLOR_TEMPLATE = """
Dear {{faculty.first_name}} {{faculty.last_name}}:

The Letter of Recommendation request from {{student.full_name}} has been edited by the student.
Please make note of new details from the site before filling the Lor Application
Current Deadline: {{deadline}}

Thank You,

Best Regards,
Head of the Department
Departments of Computer Science and Information Systems

For any query or inconvenience related to accessing the site please email to lor@hyderabad.bits-pilani.ac.in
"""


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
		try:
			existing = StudentDetails.objects.get(user=self.request.user.id)
			print("Data: ", request.data)
			serializer = self.get_serializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			lor_details = serializer.save()
			return Response({
				"lor": ViewSavedLor(lor_details, context=self.get_serializer_context()).data,
			})
		except ObjectDoesNotExist as notCreated:
			errors = {
				"profile": 'You have not created your profile yet, please create your profile before creating LOR'}
			raise ValidationError(errors)


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
			template = Template(APPLICATION_TEMPLATE)
			faculty_details = AppUser.objects.get(id=validated_data['faculty_id'])
			details = StudentDetails.objects.get(user=self.request.user.id)
			lor = Lor.objects.get(id=validated_data['lor_id'])
			dead_line = lor.deadline.replace(tzinfo=timezone.utc).astimezone(tz=None)
			send_mail(
				'New LOR Request: You got new Request with deadline on ' + dead_line,
				template.render(context=Context({'faculty': faculty_details, 'student': details, 'deadline': dead_line})),
				'ghotden@gmail.com',
				[faculty_details.email],
				fail_silently=False,
			)
			entries.append(entry)
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
		entries = Lor.objects.filter(user=self.request.user.id, deadline__gt=datetime.now(timezone.utc))
		return Response(ViewSavedLor(entries, many=True).data)


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
				item["fields"]["faculty"] = AppUser.objects.values("id", "email", "first_name", "last_name",
														   "department_name").filter(id=item["fields"]["faculty"])[0]
				result.append(item["fields"])

		print(result)
		return Response(result)


class WithdrawApplications(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['student'],
	}
	serializer_class = ViewAppliedFacultyListSerializer

	def get(self, request, lor, faculty):
		template = Template(WITHDRAW_TEMPLATE)
		faculty_details = AppUser.objects.get(id=faculty)
		details = StudentDetails.objects.get(user=self.request.user.id)
		FacultyListLor.objects.get(lor=lor, faculty=faculty).delete()
		send_mail(
			'Request Withdrawn: Lor Request has been Withdrawn by the student',
			template.render(context=Context({'faculty': faculty_details, 'student': details})),
			'ghotden@gmail.com',
			[faculty_details.email],
			fail_silently=False,
		)
		return Response('Application Withdrawn')


class EditLorApplication(generics.GenericAPIView):
		permission_classes = [
			permissions.IsAuthenticated,
			HasGroupPermission
		]
		required_groups = {
			'POST': ['student'],
		}
		serializer_class = CreateLorRequestSerializer

		def post(self, request, lor):
			try:
				existing = Lor.objects.get(id=lor, user=self.request.user.id)
				serializer = self.get_serializer(existing, data=request.data)
				serializer.is_valid(raise_exception=True)
				lor = FacultyListLor.objects.filter(lor=lor)
				student_details = serializer.save()
				for item in lor:
					faculty_details = AppUser.objects.get(id=item.faculty)
					details = StudentDetails.objects.get(user=self.request.user.id)
					dead_line = lor.deadline.replace(tzinfo=timezone.utc).astimezone(tz=None)
					template = Template(EDITLOR_TEMPLATE)
					send_mail(
						'Lor Application Edited by the student',
						template.render(
							context=Context({'faculty': faculty_details, 'student': details, 'deadline': dead_line})),
						'ghotden@gmail.com',
						[faculty_details.email],
						fail_silently=False,
					)
				return Response('Success')
			except ObjectDoesNotExist as notCreated:
				return Response('Error: Database Integrity Compromised, Contact Support if this persists')


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
