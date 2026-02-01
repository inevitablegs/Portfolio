from django.urls import path
from .views import MeView
from .views import ProfileView, AdminDashboardView, AdminProfileView

urlpatterns = [
    path("me/", MeView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view()),
    path("admin/profile/", AdminProfileView.as_view()),

]
