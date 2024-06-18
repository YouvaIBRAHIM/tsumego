import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model
from users.models import Role, UserRole

User = get_user_model()

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
