from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from .filters import UserFilter
from utils.pagination import StandardResultsSetPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UpdateUserRolesSerializer

class UserList(viewsets.ModelViewSet):
    queryset = User.objects.annotate(role_count=Count('roles')).filter(role_count__gt=0)
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

    def get_queryset(self, request=None):
        params = self.request.query_params
        page = 0
        if(params):
            try:
                page = int(params['page'])
            except:
                page = 0
        self.pagination_class = page > 0 and StandardResultsSetPagination or None
        return self.queryset
    
class UserRoles(APIView):
    def put(self, request, *args, **kwargs):
        serializer = UpdateUserRolesSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.update_roles(serializer.validated_data)
            return Response({'status': 'roles updated', 'user_id': user.id})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    