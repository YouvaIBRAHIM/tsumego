from rest_framework import serializers
from .models import Problem
import json

class ProblemSerializer(serializers.ModelSerializer):
    AB = serializers.SerializerMethodField()
    AW = serializers.SerializerMethodField()
    SOL = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = '__all__'

    def get_AB(self, obj):
      return json.loads(obj.AB)

    def get_AW(self, obj):
      return json.loads(obj.AW)

    def get_SOL(self, obj):
      return json.loads(obj.SOL)
    
    def get_author(self, obj):
      return obj.author
