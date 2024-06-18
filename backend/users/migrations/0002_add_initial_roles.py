from django.db import migrations

def add_initial_roles(apps, schema_editor):
    Role = apps.get_model('users', 'Role')
    roles = ['admin', 'editor', 'player']
    for role_name in roles:
        Role.objects.create(name=role_name)

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_initial_roles),
    ]
