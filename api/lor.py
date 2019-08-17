from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.decorators import user_passes_test
from rest_framework.views import APIView
# from knox.auth import TokenAuthentication
from .models import *


# @login_required
# @user_passes_test(lambda u: u.groups.filter(name='faculty').count() == 0, login_url='/api/auth')
class GetAllUsers(APIView):
	# print('here', TokenAuthentication.)
	# authentication_classes = (TokenAuthentication,)
	permission_classes = [
		permissions.IsAuthenticated,
	]
	serializer_class = AllUsersSerializer

	def get(self, request):
		users = AppUser.objects.all()
		user_passes_test(lambda u: u.groups.filter(name='faculty').count() == 0, login_url='/api/auth')
		return Response(AllUsersSerializer(users, many=True).data)


class AddEntry(generics.GenericAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
	]
	serializer_class = AddEntrySerializer

	def post(self, request, *args, **kwargs):
		user_passes_test(lambda u: u.groups.filter(name='faculty').count() == 0, login_url='/api/auth')
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		lor_entry = serializer.save()
		return Response({
			"Entry": AddEntrySerializer(lor_entry, context=self.get_serializer_context()).data,
		})
