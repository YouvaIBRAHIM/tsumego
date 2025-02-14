"""
URL configuration for go_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import register_view, login_view, logout_view, check_auth_view, user_profile_view, change_password_view, delete_user_account_view, get_csrf_token, top_players, user_progress, get_top_problems


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/problems/', include('go_problems.urls')),
    path('api/users/', include('users.urls')),
    path('api/register/', register_view, name='register'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/check-auth/', check_auth_view, name='check_auth'),
    path('api/profile/', user_profile_view, name='user-profile'),
    path('api/profile/change-password/', change_password_view, name='change-password'),
    path('api/profile/delete/', delete_user_account_view, name='delete-account'),
    path('api/csrf-token/', get_csrf_token, name='get-csrf-token'),
    path('api/top/players/', top_players, name='top-players'),
    path('api/user/progression/', user_progress, name='user-progression'),
    path('api/top/problems/', get_top_problems, name='top-problems'),
]
