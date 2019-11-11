# import allauth.account.utils
# from google.auth.transport import requests
import requests
# from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
# from api.models import *
# from django.contrib.auth import login, logout
# from tracker_final.custom_jwt import jwt_payload_handler
# from rest_framework_jwt.settings import api_settings
# from rest_framework.response import Response
# from allauth.account.utils import perform_login
from allauth.socialaccount.providers.google.provider import GoogleProvider
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.google.views import OAuth2LoginView, OAuth2CallbackView
from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from api.models import *
from tracker_final.custom_jwt import jwt_payload_handler


class GoogleProviderMod(GoogleProvider):
	def extract_uid(self, data):
		return str(data['sub'])

	def extract_common_fields(self, data):
		return dict(email=data.get('email'),
					last_name=data.get('family_name'),
					first_name=data.get('given_name'))


class GoogleOAuth2AdapterIdToken(GoogleOAuth2Adapter):
	provider_id = GoogleProviderMod.id

	def complete_login(self, request, app, token, **kwargs):
		resp = requests.get(self.profile_url,
							params={'access_token': token.token,
									'alt': 'json'})

		resp.raise_for_status()
		extra_data = resp.json()
		login_data = self.get_provider() \
			.sociallogin_from_response(request,
									   extra_data)
		user = AppUser.objects.get(email=extra_data['email'])
		print('user: ', user)

		login(request, user, backend='django.contrib.auth.backends.ModelBackend')
		data = AppUser.objects.get(email=user.email)
		print("Here:", data)
		payload = jwt_payload_handler(data)
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		jwt_token = jwt_encode_handler(payload)
		Response({'success': True, 'token': jwt_token})
		print({'login': login_data, 'resp': extra_data, 'token': jwt_token})
		return login_data

# # now = timezone.now()
		# # token = request.user.auth_token_set.filter(expiry__gt=now)
		# # return super(LoginView, self).post(request, format=None)
		# # token, created = Token.objects.get_or_create(user=user)

# def complete_login(self, request, app, token, **kwargs):
	# 	print(token)
	# 	idinfo = id_token.verify_oauth2_token(token.token, requests.Request(), app.client_id)
	# 	if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
	# 		raise ValueError("Wrong issuer.")
	# 	extra_data = idinfo
	# 	login = self.get_provider().sociallogin_from_response(request, extra_data)
	# 	return login


# class GoogleProvider(OAuth2Provider):
#     id = 'google'
#     name = 'Google'
#     account_class = GoogleAccount
#
#     def extract_uid(self, data):
#         return str(data['id'])
#
#     def extract_common_fields(self, data):
#         return dict(email=data.get('email'),
#                     last_name=data.get('family_name'),
#                     first_name=data.get('given_name'))
#
#
# class GoogleOAuth2Adapter(OAuth2Adapter):
#     provider_id = GoogleProvider.id
#     access_token_url = 'https://accounts.google.com/o/oauth2/token'
#     authorize_url = 'https://accounts.google.com/o/oauth2/auth'
#     profile_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
#     token_url = 'https://www.googleapis.com/oauth2/v1/tokeninfo'
#
#     def complete_login(self, request, app, token, **kwargs):
#         if 'accounts/google' in request.path:
#             print('rest-auth api')
#             # /api/rest-auth/google
#             # but not for website login with google
#             resp = requests.get(self.token_url,
#                                 params={'id_token': token.token,
#                                         'alt': 'json'})
#         else:
#             print('else else rest-auth api')
#             resp = requests.get(self.profile_url,
#                                 params={'access_token': token.token,
#                                         'alt': 'json'})
#         resp.raise_for_status()
#         extra_data = resp.json()
#         print(extra_data)
#         login = self.get_provider().sociallogin_from_response(request, extra_data)
#         return login


oauth2_login = OAuth2LoginView.adapter_view(GoogleOAuth2Adapter)
oauth2_callback = OAuth2CallbackView.adapter_view(GoogleOAuth2Adapter)
