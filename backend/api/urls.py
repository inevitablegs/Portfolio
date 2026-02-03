from django.urls import path
from .views import MeView
from .views import ProfileView, AdminDashboardView, AdminProfileView
from .views import HeroPublicView, HeroAdminView
from .views import ProjectPublicView, ProjectAdminView
from .views import (
    SkillStackPublicView,
    SkillStackAdminView,
    SkillPublicView,
    SkillAdminView,
)

from .views import ExperiencePublicView, AchievementPublicView, CertificationPublicView, ExperienceAdminView, CertificationAdminView, AchievementAdminView


from .views import (
    ProfileAssetsPublicView,
    ProfileAssetsAdminView,
)

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
    
    # Public - Skills
    path("skills/", SkillStackPublicView.as_view()),
    path("skills-new/", SkillPublicView.as_view()),

    # Admin CMS - Skills
    path("admin/skills/", SkillStackAdminView.as_view()),
    path("admin/skills-new/", SkillAdminView.as_view()),
    path("admin/skills-new/<int:pk>/", SkillAdminView.as_view()),
    
    # Public
    path("experience/", ExperiencePublicView.as_view()),
    path("achievements/", AchievementPublicView.as_view()),
    path("certifications/", CertificationPublicView.as_view()),

    # Admin CMS
    path("admin/experience/", ExperienceAdminView.as_view()),
    path("admin/experience/<int:pk>/", ExperienceAdminView.as_view()),

    path("admin/achievements/", AchievementAdminView.as_view()),
    path("admin/achievements/<int:pk>/", AchievementAdminView.as_view()),

    path("admin/certifications/", CertificationAdminView.as_view()),
    path("admin/certifications/<int:pk>/", CertificationAdminView.as_view()),
    
    path("profile-assets/", ProfileAssetsPublicView.as_view()),

    # Admin
    path("admin/profile-assets/", ProfileAssetsAdminView.as_view()),

]
