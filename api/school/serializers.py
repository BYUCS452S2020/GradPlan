from rest_framework import serializers
from .models import (School, Major, Group, Course)


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = '__all__'

    def get_courses(self, obj):
        return CourseSerializer(obj.course_set.all(), many=True).data


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
