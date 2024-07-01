from rest_framework import serializers
from .models import Problem, Parties
from users.models import UserRole

class ProblemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Problem
    fields = '__all__'

  def to_representation(self, instance):
        request = self.context.get('request')
        current_user = request.user if request else None
        data = super().to_representation(instance)

        data['author'] = f'{instance.pk_user.first_name} {instance.pk_user.last_name}'
        data.pop('pk_user', None)

        roles = UserRole.objects.filter(user=current_user).values_list('role__name', flat=True)

        if current_user:
            try:
                party = Parties.objects.get(user=current_user, tsumego_problem=instance)
                if not party.won and 'player' in roles:
                  data.pop('SOL', None)

                data['won'] = party.won
            except Parties.DoesNotExist:
                data['won'] = False
                if 'player' in roles:
                  data.pop('SOL', None)
        else:
            data['won'] = False
            if 'player' in roles:
              data.pop('SOL', None)

        return data
        