from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from enum import Enum

User = get_user_model()

class NextToPlay(Enum):
    BLACK = 'black'
    WHITE = 'white'

class Problem(models.Model):
  pk_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, default=1)
  level      = models.CharField(max_length=20, null=False)
  label      = models.CharField(max_length=50,unique=True, blank=False)
  AW         = models.JSONField()
  AB         = models.JSONField()
  SZ         = models.CharField(max_length=10)
  SOL        = models.JSONField()
  C          = models.CharField(max_length=255)
  nextToPlay = models.CharField(
    max_length=5,
    choices=[(tag.value, tag.name.capitalize()) for tag in NextToPlay],
    default=NextToPlay.BLACK.value,
  )

  def clean(self):
    if self.nextToPlay not in NextToPlay._value2member_map_:
      raise ValidationError({'nextToPlay': 'Invalid value for nextToPlay. It must be "black" or "white".'})

  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)

  def __str__(self):
    return self.label