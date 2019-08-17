from django.db import models
from django.urls import reverse
from django.shortcuts import render, get_object_or_404
# from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager


# Create your models here.


# class Login(models.Model):
# 	email = models.EmailField(null=False)
# 	password = models.CharField(max_length=250)
#
# 	def __str__(self):
# 		return self.email

class UserManager(BaseUserManager):
	use_in_migrations = True

	def _create_user(self, email, password, **extra_fields):
		"""
		Creates and saves a User with the given email and password.
		"""
		if not email:
			raise ValueError('The given email must be set')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_user(self, email, password=None, **extra_fields):
		extra_fields.setdefault('is_superuser', False)
		return self._create_user(email, password, **extra_fields)

	def create_superuser(self, email, password, **extra_fields):
		extra_fields.setdefault('is_superuser', True)

		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')

		return self._create_user(email, password, **extra_fields)


class AppUser(AbstractBaseUser, PermissionsMixin):
	id = models.AutoField(primary_key=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	email = models.EmailField(null=False, unique=True)
	department_name = models.CharField(max_length=120)
	role = models.CharField(max_length=10, null=False)
	created_at = models.DateTimeField(auto_now_add=True, null=False)
	updated_at = models.DateTimeField(auto_now=True, null=False)
	USERNAME_FIELD = 'email'
	objects = UserManager()
	# password = models.CharField(max_length=250)

	class Meta:
		ordering = ['id', 'email', 'role', 'first_name', 'last_name', 'department_name', 'created_at', 'password']

	def get_full_name(self):
		'''
		Returns the first_name plus the last_name, with a space in between.
		'''
		full_name = '%s %s' % (self.first_name, self.last_name)
		return full_name.strip()


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

# class blog(models.Model):
# 	title = models.CharField(max_length=100, unique=True)
# 	# slug = models.slugField(max_length=100, unique=True)
# 	body = models.TextField()
# 	posted = models.DateField(db_index=True, auto_now_add=True)
# 	category = models.ManyToManyField(Category, help_text='Select a category for this post')
# 	author = models.ForeignKey('Author', on_delete=models.CASCADE)
#
# 	class Meta:
# 		ordering = ["-posted"]
#
# 	def get_link(self):
# 		return self.pk
#
# 	def __str__(self):
# 		return self.title
#
#


# class Author(models.Model):
# 	user = models.OneToOneField(
# 		User,
# 		on_delete=models.CASCADE,
# 		primary_key=True,
# 		)
# 	first_name = models.CharField(max_length=100, null=True)
# 	last_name = models.CharField(max_length=100, null=True)
# 	date_of_birth = models.DateField(null=True, blank=True)
# 	date_of_death = models.DateField('Died', null=True, blank=True)
#
# 	# class Meta:
# 	# 	ordering = ["last_name","first_name"]
#
# 	def get_absolute_url(self):
#
# 		return reverse('author-detail', args=[str(self.id)])
#
# 	def __str__(self):
# 		return '{0}, {1}'.format(self.last_name,self.first_name)
