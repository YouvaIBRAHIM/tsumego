from django.urls import path, include
from .views import UserList, UserRoles
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', UserList, 'user')

urlpatterns = [
    path('', include(router.urls)),
    path('update/roles', UserRoles.as_view(), name='update-user-roles'),

]