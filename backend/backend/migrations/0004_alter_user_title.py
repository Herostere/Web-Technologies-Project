# Generated by Django 4.0.6 on 2022-08-20 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_user_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='title',
            field=models.CharField(choices=[('MR', 'Monsieur'), ('MS', 'Madame')], max_length=2),
        ),
    ]
