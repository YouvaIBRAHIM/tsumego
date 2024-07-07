import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model
from users.models import Role, UserRole
from go_problems.models import Problem, Parties
from datetime import datetime

User = get_user_model()


POINTS = {
    'beginner': 10,
    'intermediate': 20,
    'advanced': 30,
}

class Command(BaseCommand):
    help = 'Create fake users with random roles'

    def handle(self, *args, **kwargs):
        faker = Faker()
        roles = list(Role.objects.all())  # Assurez-vous que les rôles existent déjà dans la base de données
        if not roles:
            self.stdout.write(self.style.ERROR('No roles found in the database. Please create roles first.'))
            return

        for _ in range(100):  # Créer 100 utilisateurs fictifs
            first_name = faker.first_name()
            last_name = faker.last_name()
            email = faker.email()
            username = f'{last_name}_{first_name}'

            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'is_active': True,
                    'score': self.get_random_score(),
                }
            )
            if created:
                user.set_password('password')
                user.save()

                # Assigner des rôles aléatoires
                assigned_roles = random.sample(roles, random.randint(1, len(roles)))
                for role in assigned_roles:
                    UserRole.objects.create(user=user, role=role)

        self.stdout.write(self.style.SUCCESS('Successfully created 100 fake users with random roles'))

        player = None
        for role in roles:
            match role.name:
                case 'admin':
                    self.create_user(role, 'adm', 'Flo', 'Ga', 'flo@ga.fr')
                case 'editor':
                    self.create_user(role, 'edt', 'Fred', 'Vu', 'fred@vu.fr')
                case 'player':
                    player = self.create_user(role, 'plyr', 'Youva', 'Ib', 'youva@ib.fr')
        if player:
            self.create_problems_for_user(player, 10)
            fake_users = User.objects.exclude(id=player.id)[:100]
            self.create_random_parties(player, fake_users)

    def get_random_score(self):
        score_options = list(POINTS.values())
        score = random.choice(score_options) * random.randint(1, 10) 
        return score

    def create_user(self, role, username, firstname, lastname, email):
        user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'first_name': firstname,
                    'last_name': lastname,
                    'email': email,
                    'is_active': True,
                    'score': 0,
                }
            )
        if created:
            user.set_password('password')
            user.save()
            UserRole.objects.create(user=user, role=role)
            return created
        else:
            return user

    def create_problems_for_user(self, user, count):
        levels = ['beginner', 'intermediate', 'advanced']
        for i in range(count):
            level = random.choice(levels)
            Problem.objects.create(
                pk_user=user,
                level=level,
                label=f'Problem {i}',
                AW=[],
                AB=[],
                SZ='19',
                SOL=[],
                C='',
                nextToPlay='black',
                active=True,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )

    def create_random_parties(self, problem_creator, users):
        problems = Problem.objects.filter(pk_user=problem_creator)
        
        for problem in problems:
            fake_users = users[:random.randint(1, 100)]
            for fake_user in fake_users:
                Parties.objects.create(
                    user=fake_user,
                    tsumego_problem=problem,
                    won=random.choice([True, False])
                )