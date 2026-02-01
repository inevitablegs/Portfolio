from django.urls import path
from .views import MeView
from .views import ProfileView, AdminDashboardView, AdminProfileView
from .views import HeroPublicView, HeroAdminView
from .views import ProjectPublicView, ProjectAdminView


urlpatterns = [
    path("me/", MeView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view()),
    path("admin/profile/", AdminProfileView.as_view()),
    path("hero/", HeroPublicView.as_view()),
    path("admin/hero/", HeroAdminView.as_view()),
    
    
    path("projects/", ProjectPublicView.as_view()),
    path("admin/projects/", ProjectAdminView.as_view()),
    path("admin/projects/<int:pk>/", ProjectAdminView.as_view()),

]
