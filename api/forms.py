from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import AppUser


class CustomUserCreationForm(UserCreationForm):
	class Meta(UserCreationForm):
		model = AppUser
		fields = ('email', 'first_name', 'last_name', 'department_name', 'role', 'is_staff')


class CustomUserChangeForm(UserChangeForm):
	class Meta:
		model = AppUser
		fields = ('email', 'first_name', 'last_name', 'department_name', 'role', 'is_staff')


class CustomUserAdmin(UserAdmin):
	add_form = CustomUserCreationForm
	form = CustomUserChangeForm
	model = AppUser
	list_display = ('email', 'is_staff')
	list_filter = ('email', 'is_staff')
	fieldsets = (
		(None, {'fields': ('email', 'password')}),

	)
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password1', 'password2')}
		 ),
	)
	search_fields = ('email',)
	ordering = ('email',)
