from django.db import models
from kanban_backend.users.models import User
from django.contrib import admin

ROW_CHOICES = (("0", "0"),
               ("1", "1"),
               ("2", "2"),
               ("3", "3"))


class Column(models.Model):
    pass



class Card(models.Model):
    # row = models.CharField(choices=ROW_CHOICES, max_length=1)
    row = models.ForeignKey(Column, related_name='cards', on_delete=models.CASCADE)
    seq_num = models.IntegerField()
    text = models.CharField(max_length=1000)
    owner = models.ForeignKey(User, related_name='cards', on_delete=models.CASCADE)

admin.site.register(Column)
