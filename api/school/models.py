from uuid import uuid4
from django.db import models

class School(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True, unique=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=20)

class Major(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True, unique=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

class Group(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True, unique=True)
    major = models.ForeignKey(Major, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    complete = models.IntegerField()

class Course(models.Model):
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True, unique=True)
    groups = models.ManyToManyField(Group, through='CourseGroup')
    department = models.CharField(max_length=100)
    course_number = models.IntegerField()
    credits = models.DecimalField(decimal_places=1, max_digits=2)
    counts_as_general = models.BooleanField()

class CourseGroup(models.Model):
    class Meta:
        unique_together = ('group', 'course')
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True, unique=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
