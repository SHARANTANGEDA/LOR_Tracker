from django.urls import path
from .api import LoginView, RegisterFaculty, RegisterHod, RegisterAdmin
from django.urls import include
from django.conf.urls import url
from knox import views as knox_views

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/auth', include('knox.urls')),
	path('api/auth/login', LoginView.as_view()),
	path('api/auth/registerFaculty', RegisterFaculty.as_view()),
	path('api/auth/registerHod', RegisterHod.as_view()),
	path('api/auth/registerAdmin', RegisterAdmin.as_view()),
	path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]

