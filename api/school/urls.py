from django.urls import include, path
from rest_framework import routers
from school import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),

    path('schools', views.SchoolList.as_view()),
    path('schools/<uuid:school_id>', views.SchoolDetail.as_view()),
    path('schools/<uuid:school_id>/majors', views.MajorList.as_view()),

    path('major/<uuid:major_id>', views.MajorDetail.as_view()),
    path('major/<uuid:major_id>/groups', views.GroupList.as_view()),

    path('group/<uuid:group_id>', views.GroupDetail.as_view()),
    path('group/<uuid:group_id>/courses', views.GroupCoursesList.as_view()),

    path('course/<uuid:course_id>', views.CourseDetail.as_view()),
]
