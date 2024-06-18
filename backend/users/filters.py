import django_filters
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class UserFilter(django_filters.FilterSet):
    role = django_filters.CharFilter(method='filter_role')
    searchBy = django_filters.CharFilter(method='filter_search_by')

    class Meta:
        model = User
        fields = []

    def filter_search_by(self, queryset, name, value):
        search_by = self.request.query_params.get('searchBy')
        search_value = self.request.query_params.get('searchValue')

        if search_by == 'name':
            return queryset.filter(Q(first_name__icontains=search_value) | Q(last_name__icontains=search_value))
        elif search_by == 'email':
            return queryset.filter(email__icontains=search_value)
        return queryset

    def filter_role(self, queryset, name, value):
        if value and value != "all":
            return queryset.filter(roles__name=value)
        return queryset
