from .auth import *
# from lor.api import AddEntry
from django.urls import path
# from lor.api import AddEntry
from django.urls import path

from .auth import *

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	# path('api/auth', include('knox.urls')),
	path('api/auth/login', LoginView.as_view()),
	path('api/auth/registerFaculty', RegisterFaculty.as_view()),
	path('api/auth/registerHod', RegisterHod.as_view()),
	path('api/auth/registerAdmin', RegisterAdmin.as_view()),
	path('api/auth/registerStudent', RegisterStudent.as_view()),
	path('api/auth/logout', Logout.as_view()),
	path('api/auth/getRole', GoogleLogin.as_view()),
	# path("accounts/google/login", GoogleLoginView.as_view(), name="google_login"),
	# path("accounts/google/login/callback/", OAuth2CallbackView.adapter_view(GoogleOAuth2AdapterIdToken),
	# 	 name="google_callback"),
]
