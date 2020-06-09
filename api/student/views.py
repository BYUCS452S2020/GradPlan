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
        planned_courses = []
        for obj in PlannedCourse.query(str(request.user.id)):
            planned_course = {
                'semester': obj.semester,
                'courses': obj.courses
            }
            planned_courses.append(planned_course)

        return Response(planned_courses)

    def post(self, request):
        try:
            if 'course_id' in request.data:
                course = get_object(Course, request.data['course_id'])
                semester = str(request.data['year']) + request.data['semester']
                planned_courses = [{
                    'course_id': str(course.id),
                    'department': course.department,
                    'course_number': course.course_number,
                    'credits': float(course.credits)}]

                count = PlannedCourse.count(
                    str(request.user.id), PlannedCourse.semester == semester)
                if count == 1:
                    previously_planned_courses = []
                    for obj in PlannedCourse.query(
                            str(request.user.id), PlannedCourse.semester == semester):
                        previously_planned_courses += obj.courses

                    # Check if course is already in planned list
                    for planned_course in planned_courses:
                        if planned_course['course_id'] == str(course.id):
                            return Response(status=status.HTTP_204_NO_CONTENT)

                    planned_courses += previously_planned_courses

                PlannedCourse(
                    student_id=str(request.user.id),
                    semester=semester,
                    courses=planned_courses).save()
            else:
                semester = str(request.data['year']) + request.data['semester']
                count = PlannedCourse.count(
                    str(request.user.id), PlannedCourse.semester == semester)
                if count == 0:
                    planned_course = PlannedCourse(
                        student_id=str(request.user.id),
                        semester=semester,
                        courses=[])
                    planned_course.save()
                else:
                    return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_201_CREATED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PlannedCourseDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_id):
        found = False
        for obj in PlannedCourse.query(str(request.user.id)):
            courses = []
            for course in obj.courses:
                if str(course_id) == course['course_id']:
                    found = True
                else:
                    courses.append(course)
            if found:
                PlannedCourse(student_id=obj.student_id,
                              semester=obj.semester,
                              courses=courses).save()
                return Response(status=status.HTTP_204_NO_CONTENT)

        if not found:
            raise Http404


class CompletedCourses(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        completed_courses = []
        for obj in CompletedCourse.query(str(request.user.id)):
            completed_courses.append({
                'course_id': obj.course.course_id,
                'department': obj.course.department,
                'course_number': obj.course.course_number,
                'credits': obj.course.credits
            })
        return Response(completed_courses)

    def post(self, request):
        try:
            course = get_object(Course, request.data['course_id'])
            completed_course = CompletedCourse(
                student_id=str(request.user.id),
                course_id=str(course.id),
                course={
                    'course_id': str(course.id),
                    'department': course.department,
                    'course_number': course.course_number,
                    'credits': float(course.credits)
                })
            completed_course.save()
            return Response(status=status.HTTP_201_CREATED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CompletedCourseDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, course_id):
        try:
            completed_course = CompletedCourse.get(
                str(request.user.id), str(course_id))
            completed_course.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CompletedCourse.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
