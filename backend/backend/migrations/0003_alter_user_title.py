# Generated by Django 4.0.6 on 2022-08-20 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_user_title_alter_user_money'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='title',
            field=models.CharField(choices=[('--', 'Non spécifié'), ('MR', 'Monsieur'), ('MS', 'Madame')], max_length=2),
        ),
    ]
