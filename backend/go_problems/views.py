from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Problem
from .serializers import ProblemSerializer
from .filters import ProblemFilter
from .pagination import CustomLimitOffsetPagination

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProblemFilter
    pagination_class = CustomLimitOffsetPagination
