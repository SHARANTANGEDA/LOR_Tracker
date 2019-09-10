from django.db import models
from api.models import AppUser
# Create your models here.


class Lor(models.Model):
	id = models.AutoField(primary_key=True)
	student_id = models.CharField(max_length=50, null=False)
	college = models.CharField(max_length=300, null=False)
	dead_line = models.DateTimeField(null=False)
	country = models.CharField(max_length=250)
	email = models.EmailField(null=False)
	phone = models.CharField(max_length=20)
	cgpa = models.FloatField(null=False)
	portal_address = models.URLField(null=False)
	important = models.BooleanField(null=False, default=False)
	faculty = models.ForeignKey(AppUser, on_delete=models.CASCADE)
