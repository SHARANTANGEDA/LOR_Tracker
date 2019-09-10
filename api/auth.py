from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from tracker_final.custom_jwt import jwt_response_payload_handler, jwt_payload_handler
from rest_framework_jwt.settings import api_settings


class LoginView(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		print(request.data)
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		login(request, user)
		payload = jwt_payload_handler(user)
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

		token = jwt_encode_handler(payload)
		# now = timezone.now()
		# token = request.user.auth_token_set.filter(expiry__gt=now)
		# return super(LoginView, self).post(request, format=None)
		# token, created = Token.objects.get_or_create(user=user)

		return Response({'success': True, 'token': token})


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
			"token": 'Token ' + token.key
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
			"token": 'Token ' + token.key
		})


class RegisterAdmin(generics.GenericAPIView):
	permission_classes = (permissions.AllowAny,)
	serializer_class = RegisterAdminSerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		token = Token.objects.create(user=user)
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": 'Token ' + token.key
		})


class Logout(APIView):

	def get(self, request):
		# simply delete the token to force a login
		request.user.auth_token.delete()
		return Response(status=status.HTTP_200_OK)


class UserAPI(generics.RetrieveAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	serializer_class = PayloadSerializer

	def get_object(self):
		return self.request.user
