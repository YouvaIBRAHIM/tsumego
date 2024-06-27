from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from users.models import User, Role, UserRole

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
            return JsonResponse({
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'roles': [role.name],
                    'id': user.id
                }
            })
        else:
            return JsonResponse({'error': 'L\'utilisateur existe déjà.'}, status=400)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Invalid data'}, status=400)

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
                'id': user.id
            }
        })
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)

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
                'id': user.id
            }
        }, status=200)
    return JsonResponse({'is_authenticated': False}, status=401)
