from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProblemViewSet, update_problem_status, check_solution, problems_success_rate

router = DefaultRouter()
router.register('', ProblemViewSet, 'problem')

urlpatterns = [
    path('', include(router.urls)),
    path('update/status/<int:pk>/', update_problem_status, name='update-problem-status'),
    path('check/solution/', check_solution, name='check_solution'),
    path('stats/success_rate/', problems_success_rate, name='check_solution'),
]
