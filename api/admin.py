from django.contrib import admin
from .models import AppUser
from .forms import CustomUserAdmin
# Register your models here.

admin.site.register(AppUser, CustomUserAdmin)
# admin.site.register(CustomUserAdmin)
# admin.site.register(CustomUserAdmin)
