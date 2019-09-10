from django.urls import path
from .auth import LoginView, RegisterFaculty, RegisterHod, RegisterAdmin, Logout
# from lor.api import AddEntry

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	# path('api/auth', include('knox.urls')),
	path('api/auth/login', LoginView.as_view()),
	path('api/auth/registerFaculty', RegisterFaculty.as_view()),
	path('api/auth/registerHod', RegisterHod.as_view()),
	path('api/auth/registerAdmin', RegisterAdmin.as_view()),

	# path('api/lor/getAllUsers', GetAllUsers.as_view()),
	# path('api/lor/AddEntry', AddEntry.as_view()),

	path('api/auth/logout', Logout.as_view()),
]

