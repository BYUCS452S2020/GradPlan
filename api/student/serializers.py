from rest_framework import serializers
from .models import CompletedCourse, Student, PlannedCourse


class PlannedCourseSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 1
        model = PlannedCourse
        exclude = ['student']


class CompletedCourseSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 1
        model = CompletedCourse
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        exclude = ['password', 'groups', 'last_login', 'is_active',
                   'is_superuser', 'is_staff', 'date_joined', 'user_permissions']
