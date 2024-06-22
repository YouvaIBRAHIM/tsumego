from rest_framework import serializers
from .models import Problem

class ProblemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Problem
    fields = '__all__'

  def to_representation(self, instance):
      # current_user = self.context['request'].user
      # print("USER ", current_user.id)
      request = self.context.get('request')
      current_user = request.user if request else None
      print("🧨 CURRENT USER ", current_user)
      data = super().to_representation(instance)

      data['author'] = f'{instance.pk_user.first_name} {instance.pk_user.last_name}'
    
      data.pop('pk_user', None)
      # data['user'] = {
      #   "id": current_user.id,
      #   "won": False
      # }
      return data
