from allauth.account.models import EmailAddress
from allauth.socialaccount.providers.google.provider import GoogleProvider


class GoogleProviderMod(GoogleProvider):

	def extract_common_fields(self, data):
		return dict(email=data.get('email'),
					last_name=data.get('family_name'),
					first_name=data.get('given_name'))

	def extract_email_addresses(self, data):
		ret = []
		email = data.get('email')
		if email and data.get('verified_email'):
			ret.append(EmailAddress(email=email,
									verified=True,
									primary=True))
		return ret
