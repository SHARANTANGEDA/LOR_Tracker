from api.serializers import PayloadSerializer
from datetime import datetime
from calendar import timegm
from rest_framework_jwt.settings import api_settings


def jwt_payload_handler(user):
	""" Custom payload handler
	Token encrypts the dictionary returned by this function, and can be decoded by rest_framework_jwt.utils.jwt_decode_handler
	"""
	return {
		'id': user.pk,
		'email': user.email,
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
	return {
		'token': token,
		'user': PayloadSerializer(user, context={'request': request}).data,
		'success': True
	}