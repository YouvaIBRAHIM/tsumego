from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from .filters import UserFilter
from .pagination import CustomLimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count

class UserList(viewsets.ModelViewSet):
    queryset = User.objects.annotate(role_count=Count('roles')).filter(role_count__gt=0)
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter
    pagination_class = CustomLimitOffsetPagination
