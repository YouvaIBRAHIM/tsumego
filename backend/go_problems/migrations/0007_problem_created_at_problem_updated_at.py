# Generated by Django 5.0.6 on 2024-06-30 11:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('go_problems', '0006_parties'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 30, 11, 30, 0, 906583)),
        ),
        migrations.AddField(
            model_name='problem',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 30, 11, 30, 0, 906596)),
        ),
    ]
