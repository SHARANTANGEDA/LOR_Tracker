from django.urls import path
from .api import *

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/hod/getAllAcceptedRequests', GetAcceptedEntriesHod.as_view()),
	path('api/hod/getAllNewRequests', GetAllNewRequestsHod.as_view()),
	path('api/hod/getAllCompletedRequests', GetAllCompletedRequestsHod.as_view()),
	path('api/hod/getAllRequests', GetAllRequests.as_view()),
	path('api/hod/home', GetHodHome.as_view()),
	path('api/hod/getAllStudents', GetAllStudents.as_view()),
	path('api/hod/getAllFaculty', GetAllFaculty.as_view()),
	path('api/hod/activeUserControl', GetActiveUsers.as_view())
	# path('api/hod/emailCheck', CheckEmail.as_view())
]
