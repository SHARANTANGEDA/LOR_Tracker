from django.urls import path

from .api import *

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/faculty/home', GetHome.as_view()),
	path('api/faculty/getLorAcceptData', GetLorAcceptData.as_view()),
	path('api/faculty/getAcceptedLorData', AcceptedLorData.as_view()),
	path('api/faculty/acceptLor/<int:lor>/<int:faculty>', AcceptLorRequest.as_view()),
	path('api/faculty/rejectLor/<int:lor>/<int:faculty>', RejectLorRequest.as_view()),
	path('api/faculty/markAsComplete/<int:lor>/<int:faculty>', MarkRequestAsComplete.as_view()),
	path('api/faculty/getProfilePhoto/<int:student_id>', GetStudentProfilePhoto.as_view()),
	path('api/faculty/completedLorData', CompletedLorData.as_view()),
]
