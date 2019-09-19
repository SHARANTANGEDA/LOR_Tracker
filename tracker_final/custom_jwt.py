from api.serializers import PayloadSerializer
from datetime import datetime
from calendar import timegm
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_get_secret_key
import jwt
from api.models import AppUser
from django.contrib.auth import get_user_model


def jwt_payload_handler(user):
	""" Custom payload handler
	Token encrypts the dictionary returned by this function, and can be decoded by rest_framework_jwt.utils.jwt_decode_handler
	"""
	print(user.role)
	return {
		'id': user.id,
		'email': user.email,
		'first_name': user.first_name,
		'last_name': user.last_name,
		'role': user.role,
		'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA,
		'orig_iat': timegm(
			datetime.utcnow().utctimetuple()
		)
	}


def jwt_response_payload_handler(token, user=None, request=None):
	""" Custom response payload handler.
	This function controls the custom payload after login or token refresh. This data is returned through the web API.
	"""
	print(token, " :::: ", user)
	data = AppUser.objects.get(email=user.email)
	return {
		'token': token,
		'email': data.email,
		'id': data.id,
		'role': data.role,
		'first_name': data.first_name,
		'last_name': data.last_name,
		'user': PayloadSerializer(data, context={'request': request}).data,
		'success': True
	}


def jwt_get_username_from_payload_handler(payload):
    """
    Override this function if username is formatted differently in payload
    """
    return payload.get('email')
