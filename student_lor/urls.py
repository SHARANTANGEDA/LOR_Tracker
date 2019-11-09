from django.urls import path

from .api import *

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/student/editProfile', EditProfile.as_view()),
	path('api/student/uploadPicture', UploadProfilePicture.as_view()),
	path('api/student/viewProfile', GetMyProfile.as_view()),
	path('api/student/getProfilePicture', GetMyProfilePicture.as_view()),
	path('api/student/createLor', CreateLor.as_view()),
	path('api/student/editLor/<int:lor_id>', EditLor.as_view()),
	path('api/student/selectFaculty', AddFacultyForLOR.as_view()),
	path('api/student/editSubmittedLor/<int:faculty>/<int:lor>', EditSubmittedLorCourseDetails.as_view()),
	path('api/student/getSavedLor', GetMySavedLor.as_view()),
	path('api/student/getSavedLorForApplication', GetLorForApplication.as_view()),
	path('api/student/getFacultyList', GetFacultyList.as_view()),
	path('api/student/home', GetAppliedLor.as_view()),
	path('api/student/getUnivList', GetUnivList.as_view()),
	path('api/student/getAppliedLor', GetAppliedLor.as_view()),
	path('api/student/getProfilePhoto', ViewProfilePhoto.as_view()),
	path('api/student/deleteLor/<int:lor_id>', DeleteLor.as_view()),
	path('api/student/withdrawApplication/<int:faculty>/<int:lor>', WithdrawApplications.as_view()),

]

