from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from django.db import models


class AllEntriesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['student_id', 'college', 'dead_line', 'country', 'email', 'phone', 'cgpa', 'portal_address']


class AddEntrySerializer(serializers.ModelSerializer):
	class Meta:
		model = Lor
		fields = ['student_id', 'college', 'dead_line', 'country', 'email', 'phone', 'cgpa', 'portal_address']

	def create(self, validated_data):
		entry = Lor.objects.create(
			student_id=validated_data['student_id'],
			college=validated_data['college'],
			dead_line=validated_data['dead_line'],
			country=validated_data['country'],
			email=validated_data['email'],
			phone=validated_data['phone'],
			cgpa=validated_data['cgpa'],
			portal_address=validated_data['portal_address'],
			faculty_id=self.context['request'].user.id
		)
		return entry
