# Generated by Django 4.0.6 on 2022-08-20 13:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medical_website', '0003_alter_customuserprofile_company'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUserProfile',
        ),
    ]
