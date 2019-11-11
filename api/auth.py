from django.contrib.auth import login, logout
from oauth2_provider.models import AccessToken
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework_social_oauth2.views import ConvertTokenView

from tracker_final.custom_jwt import jwt_payload_handler
from .models import *
from .serializers import *


class LoginView(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		login(request, user)
		data = AppUser.objects.get(email=user.email)
		print("Here:", data.id)
		payload = jwt_payload_handler(data)
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		token = jwt_encode_handler(payload)
		# now = timezone.now()
		# token = request.user.auth_token_set.filter(expiry__gt=now)
		# return super(LoginView, self).post(request, format=None)
		# token, created = Token.objects.get_or_create(user=user)
		return Response({'success': True, 'token': token})


class GoogleLogin(ConvertTokenView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request, *args, **kwargs):
		response = super(GoogleLogin, self).post(request, *args, **kwargs)
		print(response.data)
		token = AccessToken.objects.get(token=response.data['access_token'])
		user = token.user
		faculty_mail_list = []
		hod_mail_list = []
		if not str(user.email).__contains__('@hyderabad.bits-pilani.ac.in'):
			return ValidationError("You can't use this application!")
		# if user.role == '' or user.role is None:
		if user.email in faculty_mail_list:
			user_update = AppUser.objects.filter(id=user.id).update(role='faculty')
			group, created = Group.objects.get_or_create(name='faculty')
			user.groups.add(group)
		elif user.email in hod_mail_list:
			user_update = AppUser.objects.filter(id=user.id).update(role='hod')
			group, created = Group.objects.get_or_create(name='hod')
			user.groups.add(group)
		else:
			user_update = AppUser.objects.filter(id=user.id).update(role='student')
			group, created = Group.objects.get_or_create(name='student')
			user.groups.add(group)
		print(user)
		login(request, user, backend='django.contrib.auth.backends.ModelBackend')
		payload = jwt_payload_handler(user)
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		jwt_token = jwt_encode_handler(payload)
		return Response({'success': True, 'token': jwt_token})


class RegisterFaculty(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = RegisterFacultySerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		token = Token.objects.create(user=user)
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"success": True
		})


# Register API
# class RegisterAPI(generics.GenericAPIView):


class RegisterHod(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = RegisterHodSerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		token = Token.objects.create(user=user)
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"success": True
		})


class RegisterAdmin(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = RegisterAdminSerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"success": True
		})


class RegisterStudent(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = RegisterStudentSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"success": True
		})


class Logout(APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		logout(request)
		return Response({"Logged Out"})


class UserAPI(generics.RetrieveAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	serializer_class = PayloadSerializer

	def get_object(self):
		return self.request.user

# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from google.auth.transport import requests
# from google.oauth2 import id_token
# from tracker_final.settings import CLIENT_ID_GOOGLE
#
# class VerifyToken(APIView):
# 	permission_classes = (permissions.AllowAny,)  # maybe not needed in your case
#
# 	# @django.views.decorators.csrf.csrf_exempt
# 	def get(self, request):
# 		print('hitting endpoint')
# 		print(request.data)
# 		requestJson = json.loads(request.data)
# 		request = requests.Request()
# 		id_info = id_token.verify_oauth2_token(requestJson['token'], request, CLIENT_ID_GOOGLE)
# 		if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
# 			return Response("Unable to Validate User: Wrong Issuer")
# 		if not id_info:
# 			return Response("Unable to Validate User: Invalid Token")
# 		id = id_info['email']
# 		# In this case, if the Person already exists, its name is updated
# 		# user, created = User.objects.update_or_create(
# 		# 	email=id, defaults={
# 		# 		"first_name": id_info['given_name'],
# 		# 		"last_name": id_info['family_name'],
# 		# 		"last_login": datetime.now(),
# 		# 		"email_verified": id_info['email_verified'],
# 		# 		"exp": id_info['exp'],
# 		# 		"locale": id_info['locale'],
# 		# 		"name": id_info['name'],
# 		# 		"picture": id_info['picture'],
# 		# 		"initials": user_letters,
# 		# 		"username": id_info['given_name'] + " " + id_info['family_name'],
# 		# 	}
# 		# )
# 		user, created = AppUser.objects.update_or_create(
# 			email=id, defaults={
# 				"first_name": id_info['given_name'],
# 				"last_name": id_info['family_name'],
# 			}
# 		)
# 		profile, created_picture = StudentProfilePicture.objects.update_or_create(user=user.id, defaults={
# 			"picture_url_google": id_info['picture'],
# 		})
#
# 		if created:
# 			serializer = PayloadSerializer(user)
# 			return Response(serializer.data)


# class GoogleLogin(SocialLogin, APIView):
# 	permission_classes = [
# 		permissions.IsAuthenticated,
# 		HasGroupPermission
# 	]
# 	required_groups = {
# 		'GET': ['student'],
# 	}
# 	adapter_class = GoogleOAuth2Adapter
# 	client_class = OAuth2Client
#
# 	def get(self, request):
# 		print(self.adapter_class, request.data)
# 		return Response('success')
# serializer = self.get_serializer(data=request.data)
# serializer.is_valid(raise_exception=True)
# user = serializer.validated_data
# login(request, user)
# data = AppUser.objects.get(email=user.email)
# print("Here:", data.id)
# payload = jwt_payload_handler(data)
# jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# token = jwt_encode_handler(payload)
# # now = timezone.now()
# # token = request.user.auth_token_set.filter(expiry__gt=now)
# # return super(LoginView, self).post(request, format=None)
# # token, created = Token.objects.get_or_create(user=user)
# return Response({'success': True, 'token': token})
#
#
# class GoogleLoginView(SocialLoginView):
# 	adapter_class = GoogleOAuth2AdapterIdToken
# 	callback_url = "http://localhost:8000/api/v1/users/login/google/callback/"
# 	client_class = OAuth2Client
# 	serializer_class = SocialLoginSerializer
#
#
# class GooglePostLogin(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	serializer_class = LoginSerializer
#
# 	def get(self, request, *args, **kwargs):
# 		data = AppUser.objects.get(id=self.request.user.id)
# 		print("Here:", data)
# 		payload = jwt_payload_handler(data)
# 		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# 		token = jwt_encode_handler(payload)
# 		return Response({'success': True, 'token': token})
