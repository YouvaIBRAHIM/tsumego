from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProblemViewSet, update_problem_status

router = DefaultRouter()
# router.register(r'problems', ProblemViewSet)
router.register('', ProblemViewSet, 'problem')

urlpatterns = [
    path('', include(router.urls)),
    path('update/status/<int:pk>/', update_problem_status, name='update-problem-status'),
]
