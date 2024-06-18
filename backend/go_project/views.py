from rest_framework import viewsets
from .models import Problem
from .serializers import ProblemSerializer

class ProblemViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemSerializer
    queryset = Problem.objects.all()
