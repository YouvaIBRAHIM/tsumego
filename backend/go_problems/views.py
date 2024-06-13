from rest_framework import viewsets
from .models import Problem
from .serializers import ProblemSerializer
from utils.pagination import StandardResultsSetPagination

class ProblemViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemSerializer
    queryset = Problem.objects.all()

    def get_queryset(self, request=None):
        params = self.request.query_params
        page = 0
        if(params):
            try:
                page = int(params['page'])
            except:
                page = 0

        self.pagination_class = page > 0 and StandardResultsSetPagination or None

        return Problem.objects.all()
