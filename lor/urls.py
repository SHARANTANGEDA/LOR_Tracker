from django.urls import path
from .api import AddEntry, GetMyEntries, GetAllEntries

# url('^api-auth/', include('rest_framework.urls'))

urlpatterns = [
	path('api/lor/AddEntry', AddEntry.as_view()),
	path('api/lor/getMyEntries', GetMyEntries.as_view()),
	path('api/lor/getAllEntries', GetAllEntries.as_view())
]

