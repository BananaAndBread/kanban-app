from django.db import models
from kanban_backend.users.models import User
ROW_CHOICES = (("0", "0"),
               ("1", "1"),
               ("2", "2"),
               ("3", "3"))


class Card(models.Model):
    row = models.CharField(choices=ROW_CHOICES, max_length=1)
    seq_num = models.IntegerField()
    text = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name='cards', on_delete=models.CASCADE)

