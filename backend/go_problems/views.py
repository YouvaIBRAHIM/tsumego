from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Problem
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Problem, Parties
from .serializers import ProblemSerializer
from .filters import ProblemFilter
from utils.pagination import StandardResultsSetPagination
from users.models import UserRole

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProblemFilter
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request=None):
        params = self.request.query_params
        page = 0
        if(params):
            try:
                page = int(params['page'])
            except:
                page = 0
        self.pagination_class = page > 0 and StandardResultsSetPagination or None

        # Si l'utilisateur a uniquement le role 'player', on ne récupère pas les problèmes qu'il a crée
        user = self.request.user
        roles = UserRole.objects.filter(user=user).values_list('role__name', flat=True)
        if 'player' in roles and len(roles) == 1:
            self.queryset = self.queryset.exclude(pk_user=user)

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
                )# router.register(r'problems', ProblemViewSet)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_problem_status(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=status.HTTP_404_NOT_FOUND)

    problem.active = not problem.active
    problem.save()
    return Response({'id': problem.id, 'active': problem.active}, status=status.HTTP_200_OK)


POINTS = {
    'beginner': 10,
    'intermediate': 20,
    'advanced': 30,
}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_solution(request):
    user = request.user
    problem_id = request.data.get('problem_id')
    response_sol = request.data.get('solution')

    if not problem_id or not response_sol:
        return Response({"message": "La solution et l'id du problème sont requis"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        problem = Problem.objects.get(id=problem_id)
    except Problem.DoesNotExist:
        return Response({"message": "Le problème est introuvable"}, status=status.HTTP_404_NOT_FOUND)

    if problem.pk_user == user:
        return Response({"message": "Vous ne pouvez pas jouer les problèmes que vous avez crées"}, status=status.HTTP_403_FORBIDDEN)

    is_correct = problem.SOL[1] == response_sol

    try:
        party = Parties.objects.get(user=user, tsumego_problem=problem)
        is_already_won = party.won
    except Parties.DoesNotExist:
        is_already_won = False

    if is_already_won:
        return Response({"message": "Vous avez déjà solutionné ce problème"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    Parties.objects.update_or_create(
        user=user,
        tsumego_problem=problem,
        defaults={'won': is_correct}
    )

    if is_correct and not is_already_won:
        points = POINTS.get(problem.level, 0)
        user.score += points
        user.save()

    if is_correct:
        return Response({"correct": is_correct}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Solution incorrecte"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    