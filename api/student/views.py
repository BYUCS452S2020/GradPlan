from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from school.models import Course
from school.serializers import CourseSerializer
from student.models import CompletedCourse, PlannedCourse, Student
from student.serializers import CompletedCourseSerializer, PlannedCourseSerializer, StudentSerializer


def get_object(model, object_id, **kwargs):
    try:
        return model.objects.get(pk=object_id, **kwargs)
    except model.DoesNotExist:
        raise Http404


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get_or_create(user=user)

        return Response({
            'student': StudentSerializer(user).data,
            'token': token[0].key,
        })


class Register(APIView):
    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = Student.objects.create_user(
                serializer.validated_data['email'],
                request.data['password'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'])

            return Response({
                'student': StudentSerializer(student).data,
                'token': student.auth_token.key
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlannedCourses(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = PlannedCourseSerializer(
            PlannedCourse.objects.filter(student=request.user), many=True)
        return Response(serializer.data)

    def post(self, request):
        course = get_object(Course, request.data.get('course_id', ''))
        planned_course = PlannedCourse(
            student=request.user,
            course=course,
            year=request.data.get('year', 0),
            semester=request.data.get('semester', ''))
        planned_course.save()
        return Response(status=status.HTTP_201_CREATED)


class PlannedCourseDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_id):
        try:
            PlannedCourse.objects.get(
                student=request.user, course_id=course_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PlannedCourse.DoesNotExist:
            raise Http404


class CompletedCourses(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CourseSerializer(
            request.user.completed_courses.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        course = get_object(Course, request.data.get('course_id', ''))
        completed_course = CompletedCourse(
            student=request.user, course=course)
        completed_course.save()
        return Response(status=status.HTTP_201_CREATED)


class CompletedCourseDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_id):
        try:
            CompletedCourse.objects.get(
                student=request.user, course_id=course_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CompletedCourse.DoesNotExist:
            raise Http404
