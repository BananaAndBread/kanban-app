# Generated by Django 3.0.9 on 2020-08-19 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('row', models.IntegerField(choices=[('0', '0'), ('1', '1'), ('2', '2'), ('3', '3')])),
                ('seq_num', models.IntegerField()),
                ('text', models.CharField(max_length=1000)),
            ],
        ),
    ]
