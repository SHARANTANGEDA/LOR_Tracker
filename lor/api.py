from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView
from .models import *
from .permissions import HasGroupPermission


class GetMyEntries(APIView):
	# print('here', TokenAuthentication.)
	# authentication_classes = (TokenAuthentication,)
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['faculty'],
	}
	serializer_class = AllEntriesSerializer

	def get(self, request):
		entries = Lor.objects.filter(faculty_id=self.request.user.id)
		return Response(AllEntriesSerializer(entries, many=True).data)


class AddEntry(generics.GenericAPIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'POST': ['faculty'],
	}
	serializer_class = AddEntrySerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		lor_entry = serializer.save()
		return Response({
			"Entry": AddEntrySerializer(lor_entry, context=self.get_serializer_context()).data,
		})


class GetAllEntries(APIView):
	permission_classes = [
		permissions.IsAuthenticated,
		HasGroupPermission
	]
	required_groups = {
		'GET': ['admin'],
	}
	serializer_class = AllEntriesSerializer

	def get(self, request):
		entries = Lor.objects.all()
		print(entries)
		return Response(AllEntriesSerializer(entries, many=True).data)
