from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from school.models import Course, Group, Major, School
from school.serializers import CourseSerializer, GroupSerializer, MajorSerializer, SchoolSerializer

def get_object(model, object_id, **kwargs):
    try:
        return model.objects.get(pk=object_id, **kwargs)
    except model.DoesNotExist:
        raise Http404

class SchoolList(APIView):
    def get(self, request):
        schools = School.objects.all().order_by('name')
        serializer = SchoolSerializer(schools, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SchoolDetail(APIView):
    def delete(self, request, school_id):
        get_object(School, school_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, school_id):
        return Response(SchoolSerializer(get_object(School, school_id)).data)

    def put(self, request, school_id):
        serializer = SchoolSerializer(get_object(School, school_id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MajorList(APIView):
    def get(self, request, school_id):
        majors = Major.objects.filter(school_id=school_id).order_by('title')
        serializer = MajorSerializer(majors, many=True)
        return Response(serializer.data)

    def post(self, request, school_id):
        request.data['school'] = school_id
        serializer = MajorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MajorDetail(APIView):
    def delete(self, request, major_id):
        get_object(Major, major_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, major_id):
        return Response(MajorSerializer(get_object(Major, major_id)).data)

    def put(self, request, major_id):
        serializer = MajorSerializer(get_object(Major, major_id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupList(APIView):
    def get(self, request, major_id):
        groups = Group.objects.filter(major_id=major_id).order_by('title')
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    def post(self, request, major_id):
        request.data['major'] = major_id
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupDetail(APIView):
    def delete(self, request, group_id):
        get_object(Group, group_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, group_id):
        return Response(GroupSerializer(get_object(Group, group_id)).data)

    def put(self, request, group_id):
        serializer = GroupSerializer(get_object(Group, group_id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupCoursesList(APIView):
    def get(self, request, group_id):
        courses = Course.objects.filter(coursegroup__group_id=group_id).order_by('course_number')
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, group_id):
        request.data['groups'] = [GroupSerializer(get_object(Group, group_id)).data]
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            course = get_object(Course, serializer.data['id'])
            course.groups.add(group_id)
            serializer = CourseSerializer(course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    def delete(self, request, course_id):
        get_object(Course, course_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, course_id):
        return Response(CourseSerializer(get_object(Course, course_id)).data)

    def put(self, request, course_id):
        serializer = CourseSerializer(get_object(Course, course_id), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
