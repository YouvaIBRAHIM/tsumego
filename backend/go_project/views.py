from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from users.models import User, Role, UserRole
from django.contrib.auth import update_session_auth_hash
from django.middleware.csrf import get_token
from users.serializers import UserProfileSerializer, PasswordChangeSerializer

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    first_name = request.data.get('firstName')
    last_name = request.data.get('lastName')
    username = f"{first_name}_{last_name}"
    password = request.data.get('password')
    email = request.data.get('email')
    role = Role.objects.get(name='player')

    try:
        user, created = User.objects.get_or_create(
            is_superuser=False,
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_staff=False,
            is_active=True
        )
        if created:
            user.set_password(password)
            user.save()
            UserRole.objects.create(user=user, role=role)
            login(request, user)
            return JsonResponse({
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'roles': [role.name],
                    'id': user.id,
                    'firstName': user.first_name,
                    'lastName': user.last_name
                }
            })
        else:
            return JsonResponse({'message': 'L\'utilisateur existe déjà.'}, status=400)
    except Exception:
        return JsonResponse({'message': 'Données incorrectes'}, status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        roles = user.roles.values_list('name', flat=True)
        return JsonResponse({
            'user': {
                'username': user.username,
                'email': user.email,
                'roles': list(roles),
                'id': user.id,
                'firstName': user.first_name,
                'lastName': user.last_name
            }
        })
    else:
        return JsonResponse({'message': 'Identifiants incorrects'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Connexion réussie'}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def check_auth_view(request):
    user = request.user
    if user.is_authenticated:
        roles = user.roles.values_list('name', flat=True)
        return JsonResponse({
            'is_authenticated': True,
            'user': {
                'username': user.username,
                'email': user.email,
                'roles': list(roles),
                'id': user.id,
                'firstName': user.first_name,
                'lastName': user.last_name
            }
        }, status=200)
    return JsonResponse({'is_authenticated': False}, status=401)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def user_profile_view(request):
    user = request.user

    if request.method == 'PUT':
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def change_password_view(request):
    serializer = PasswordChangeSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        if not user.check_password(serializer.validated_data['current_password']):
            return Response({'message': "Mot de passe actuel incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash(request, user)
        return JsonResponse({'message': "Mot de passe changé avec succès."})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def delete_user_account_view(request):
    user = request.user
    user.delete()
    logout(request)
    return JsonResponse({"message": "Compte supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})