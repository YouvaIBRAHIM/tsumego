from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Role, UserRole

class UserRoleInline(admin.TabularInline):
    model = UserRole
    extra = 1

class CustomUserAdmin(UserAdmin):
    inlines = [UserRoleInline]

admin.site.register(User, CustomUserAdmin)
admin.site.register(Role)
admin.site.register(UserRole)
