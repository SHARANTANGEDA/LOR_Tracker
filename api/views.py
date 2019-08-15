from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.hashers import make_password


# @csrf_exempt
# def login(request):
# 	if request.method == "POST":
# 		email = request.POST.get('email')
# 		password = request.POST.get('password')
# 		if email is not None and password is not None:
# 			email_check = (User.objects.get(email=email))
# 			if email_check.password == make_password(password):
# 				cache.set('my_email', email, 30)
# 				if (namecheck.entity == "Teacher"):
# 					return render(request, 'frontend/Teacher.html')
# 				else:
# 					return render(request, 'frontend/Student.html')
# 			else:
# 				return HttpResponse("Login Unsuccessful")
# 		else:
# 			return HttpResponse("Login Unsuccessful")
# 	elif request.method == "GET":
# 		return HttpResponse("Login Unsuccessful, please use post method")  # TODO Change this
