from django.urls import path
from .api import *

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/student/editProfile', EditProfile.as_view()),
	path('api/student/viewProfile', GetMyProfile.as_view()),
	path('api/student/createLor', CreateLor.as_view()),
	path('api/student/selectFaculty', AddFacultyForLOR.as_view()),
	path('api/student/getSavedLor', GetMySavedLor.as_view()),
	path('api/student/getFacultyList', GetFacultyList.as_view()),
	path('api/student/home', GetAppliedLor.as_view()),
	path('api/student/getUnivList', GetUnivList.as_view()),
]

