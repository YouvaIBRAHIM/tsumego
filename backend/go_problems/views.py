from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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



@api_view(['PUT'])
def update_problem_status(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    problem.active = not problem.active
    problem.save()
    return Response({'id': problem.id, 'active': problem.active}, status=status.HTTP_200_OK)