import json
from django.core.management.base import BaseCommand
from go_problems.models import Problem
from tsumego_scrapping.transform import transorm_scrapping_data
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
  help = 'Insert scrapped problems into the database'

  def handle(self, *args, **kwargs):
    problems_data = transorm_scrapping_data()

    for data in problems_data:

      existing_problem = Problem.objects.filter(label=data['label']).first()

      if existing_problem is not None:
        continue
      else:

        usr = data["user"]
        user, created = User.objects.get_or_create(is_superuser=False,username=f'{usr["last_name"]}-{usr["first_name"]}', first_name=usr['first_name'], last_name=usr["last_name"], email=usr["email"], is_staff=False, is_active=True)
        if created:
          user.set_password("password")
          user.save()

        problem = Problem(
          pk_user_id = user.id,
          level      = data['level'],
          label      = data['label'],
          AW         = json.dumps(data['AW']),
          AB         = json.dumps(data['AB']),
          SZ         = data['SZ'],
          SOL        = json.dumps(data['SOL']),
          C          = data['C'],
          nextToPlay  = data['nextToPlay']
        )
        problem.save()

    self.stdout.write(self.style.SUCCESS('🎉 Successfully inserted problems into the database'))
