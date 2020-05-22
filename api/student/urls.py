from django.urls import path
from student import views

urlpatterns = [
    path('login', views.Login.as_view()),
    path('register', views.Register.as_view()),
    path('planned', views.PlannedCourses.as_view()),
    path('completed', views.CompletedCourses.as_view()),
]
