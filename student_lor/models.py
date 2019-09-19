from django.db import models
from api.models import AppUser
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class StudentDetails(models.Model):
	user = models.OneToOneField(AppUser, on_delete=models.CASCADE, primary_key=True)
	student_id = models.CharField(max_length=50, null=False)
	full_name = models.CharField(max_length=100, null=False)
	email = models.EmailField(null=False)
	phone = models.CharField(max_length=20)
	cgpa = models.FloatField(null=False)
	graduation_status = models.BooleanField(editable=True, default=False)
	degree = models.CharField(max_length=50)
	updated_at = models.DateTimeField(auto_now=True, null=False)


class Lor(models.Model):
	id = models.AutoField(primary_key=True)
	user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	purpose = models.CharField(max_length=250, null=False)
	others_details = models.CharField(max_length=250, null=True, blank=True)
	university_name = models.CharField(max_length=250)
	portal_address = models.URLField(null=False)
	program_name = models.CharField(max_length=250)
	deadline = models.DateTimeField()
	created_at = models.DateTimeField(auto_now_add=True, null=False)
	updated_at = models.DateTimeField(auto_now=True, null=False)


class FacultyListLor(models.Model):
	class Meta:
		unique_together = (("lor", "faculty"),)

	lor = models.ForeignKey(Lor, on_delete=models.CASCADE)
	faculty = models.ForeignKey(AppUser, on_delete=models.CASCADE)

