from uuid import uuid4
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from school.models import Course, Major


class StudentManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Students must have an email address')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


@receiver(models.signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Student(AbstractUser):
    """
    Fields inherited from AbstractBaseUser
        * username - overridden with None to use email instead
        * first_name
        * last_name
        * email - overridden to set unique constraint and use as username
        * is_staff
        * is_active
        * date_joined
        * password - automatically hashed and secured
        * last_login
        * is_superuser
    """
    id = models.UUIDField(default=uuid4, editable=False,
                          primary_key=True, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = None

    major = models.ForeignKey(Major, on_delete=models.SET_NULL, null=True)
    school_id = models.CharField(max_length=50, null=True)
    completed_courses = models.ManyToManyField(
        Course, through='CompletedCourse', related_name='+')
    planned_courses = models.ManyToManyField(
        Course, through='PlannedCourse', related_name='+')

    objects = StudentManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


class CompletedCourse(models.Model):
    id = models.UUIDField(default=uuid4, editable=False,
                          primary_key=True, unique=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)


class PlannedCourse(models.Model):
    class Semester(models.TextChoices):
        FALL = 'F', 'Fall'
        SPRING = 'Sp', 'Spring'
        SUMMER = 'Su', 'Summer'
        WINTER = 'W', 'Winter'

    id = models.UUIDField(default=uuid4, editable=False,
                          primary_key=True, unique=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    year = models.IntegerField()
    semester = models.CharField(
        choices=Semester.choices, max_length=2, default=Semester.FALL)
