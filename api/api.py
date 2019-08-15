from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from .models import *


class LoginView(generics.GenericAPIView):
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		instance, token = AuthToken.objects.create(user)

		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": token
		})


class RegisterFaculty(generics.GenericAPIView):
	serializer_class = RegisterFacultySerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)

		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		print('USER: ', user)
		instance, token = AuthToken.objects.create(user)
		print({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": token
		})
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": token
		})


# # Register API
# class RegisterAPI(generics.GenericAPIView):


class RegisterHod(generics.GenericAPIView):
	serializer_class = RegisterHodSerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": AuthToken.objects.create(user)
		})


class RegisterAdmin(generics.GenericAPIView):
	serializer_class = RegisterAdminSerializers

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		return Response({
			"user": PayloadSerializer(user, context=self.get_serializer_context()).data,
			"token": AuthToken.objects.create(user)
		})


class UserAPI(generics.RetrieveAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	serializer_class = PayloadSerializer

	def get_object(self):
		return self.request.user
