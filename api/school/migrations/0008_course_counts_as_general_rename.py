# Generated by Django 3.0.6 on 2020-05-17 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0007_course_groups'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='countsAsGeneral',
            new_name='counts_as_general',
        ),
    ]
