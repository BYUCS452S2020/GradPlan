from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from student.models import Student
from student.serializers import StudentSerializer

class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
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
