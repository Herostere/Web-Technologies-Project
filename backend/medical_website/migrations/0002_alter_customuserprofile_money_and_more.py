# Generated by Django 4.0.6 on 2022-08-18 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical_website', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuserprofile',
            name='money',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='customuserprofile',
            name='zip_code',
            field=models.PositiveIntegerField(),
        ),
    ]
