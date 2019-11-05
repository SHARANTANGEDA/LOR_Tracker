from django.contrib.postgres.fields import JSONField
from django.db import models

from api.models import AppUser


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
	# graduation_year = models.CharField(max_length=5, null=False)
	updated_at = models.DateTimeField(auto_now=True, null=False)


class StudentProfilePicture(models.Model):
	picture = models.ImageField(upload_to='student_profile_pics')
	user = models.OneToOneField(AppUser, on_delete=models.CASCADE, primary_key=True)


class Lor(models.Model):
	id = models.AutoField(primary_key=True)
	user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	purpose = models.CharField(max_length=250, null=False)
	others_details = models.CharField(max_length=250, null=True, blank=True)
	university_name = models.CharField(max_length=250)
	program_name = models.CharField(max_length=250)
	deadline = models.DateTimeField()
	expired = models.BooleanField(editable=True, default=False)
	hidden = models.BooleanField(editable=True, default=False)
	created_at = models.DateTimeField(auto_now_add=True, null=False)
	updated_at = models.DateTimeField(auto_now=True, null=False)


class FacultyListLor(models.Model):
	class Meta:
		unique_together = (("lor", "faculty"),)

	lor = models.ForeignKey(Lor, on_delete=models.CASCADE)
	faculty = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	courses_done = JSONField()
	projects_done = JSONField()
	thesis_done = JSONField()
	status = models.BooleanField(editable=True, default=False)
	application_status = models.CharField(max_length=15,
										  choices=[('AP', 'Applied'), ('AC', 'Accepted'), ('RE', 'Rejected'), ('CO', 'Completed'), ('EX', 'Expired')],
										  default='AP')
	others = models.CharField(max_length=500)
	created_at = models.DateTimeField(auto_now_add=True, null=False)
	updated_at = models.DateTimeField(auto_now=True, null=False)
	days_15 = models.BooleanField(editable=True, default=False)
	days_7 = models.BooleanField(editable=True, default=False)
	days_3 = models.BooleanField(editable=True, default=False)
	days_1 = models.BooleanField(editable=True, default=False)


