import django_filters
from django.db.models import Q
from .models import Problem

class ProblemFilter(django_filters.FilterSet):
    searchValue = django_filters.CharFilter(method='filter_by_search')
    status = django_filters.CharFilter(method='filter_by_status')
    level = django_filters.CharFilter(method='filter_by_level')

    class Meta:
        model = Problem
        fields = []

    def filter_by_search(self, queryset, name, value):
        search_by = self.request.query_params.get('searchBy')
        search_value = self.request.query_params.get('searchValue')

        if search_by and search_value:
            if search_by == 'label':
                queryset = queryset.filter(label__icontains=search_value)
            elif search_by == 'author':
                queryset = queryset.filter(
                    Q(pk_user__first_name__icontains=search_value) | 
                    Q(pk_user__last_name__icontains=search_value)
                )
        return queryset

    def filter_by_status(self, queryset, name, value):
        status = self.request.query_params.get('status')
        if status == 'active':
            queryset = queryset.filter(active=True)
        elif status == 'inactive':
            queryset = queryset.filter(active=False)
        return queryset

    def filter_by_level(self, queryset, name, value):
        if value and value != 'all':
            queryset = queryset.filter(level=value)
        return queryset
