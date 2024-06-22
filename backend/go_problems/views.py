from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Problem
from rest_framework import viewsets, status
from rest_framework.response import Response
#from rest_framework.permissions import IsAuthenticated
from .models import Problem
from .serializers import ProblemSerializer
from .filters import ProblemFilter
from utils.pagination import StandardResultsSetPagination

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProblemFilter

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

    def create(self, seializer, *args, **kwargs):
        serializer = ProblemSerializer(data=self.request.data)
        # permission_class = [IsAuthenticated, ]
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        #permission_class = [IsAuthenticated, ]
        try:
            item = self.get_object()
            id = item.id
            item.delete()
            return Response({
                "id": id,
                "message": f"Tsumego {id} REMOVED !!!",
                "status": "success"} ,
                status=status.HTTP_204_NO_CONTENT
                )
        except:
            return Response({
                "message": "Tsumego NOT FOUND !!!",
                "status": "error"} ,
                status=status.HTTP_404_NOT_FOUND
                )


@api_view(['PUT'])
def update_problem_status(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    problem.active = not problem.active
    problem.save()
    return Response({'id': problem.id, 'active': problem.active}, status=status.HTTP_200_OK)
