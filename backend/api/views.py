from django.shortcuts import render

# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "message": "Welcome to dashboard",
            "user": request.user.username
        })


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email
        })









from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile, Hero, Project
from .serializers import ProfileSerializer, HeroSerializer, ProjectSerializer






class ProfileView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        profile = Profile.objects.first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get(self, request):
        return Response({
            "message": "Welcome Admin",
            "mode": "developer"
        })


# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from .permissions import IsSuperUser

class AdminProfileView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(
            id=1,
            defaults={
                "name": "Your Name",
                "title": "Software Developer",
                "location": "India",
                "email": "you@example.com",
                "phone": "",
                "open_to": "Open to opportunities",
                "skills": "",
            }
        )
        return profile

    def get(self, request):
        profile = self.get_object()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = self.get_object()
        serializer = ProfileSerializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request):
        profile = self.get_object()
        serializer = ProfileSerializer(
            profile, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class HeroPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        hero = Hero.objects.first()
        serializer = HeroSerializer(hero)
        return Response(serializer.data)
    
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class HeroAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get_object(self):
        hero, _ = Hero.objects.get_or_create(
            id=1,
            defaults={
                "name": "Ganesh Sonawane",
                "tagline": "Software Developer · Django · AI · Unity",
                "intro": "I build practical, scalable software.",
            }
        )
        return hero

    def get(self, request):
        hero = self.get_object()
        return Response(HeroSerializer(hero).data)

    def patch(self, request):
        hero = self.get_object()
        serializer = HeroSerializer(hero, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProjectPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        projects = Project.objects.all().order_by("order", "-created_at")
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class ProjectAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        projects = Project.objects.all().order_by("order")
        return Response(ProjectSerializer(projects, many=True).data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, pk):
        project = Project.objects.get(pk=pk)
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        Project.objects.filter(pk=pk).delete()
        return Response({"deleted": True})


from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SkillStack, Skill
from .serializers import SkillStackSerializer, SkillSerializer

class SkillStackPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        stack = SkillStack.objects.first()
        if not stack:
            return Response({})
        return Response(SkillStackSerializer(stack).data)


class SkillPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        skills = Skill.objects.all()
        return Response(SkillSerializer(skills, many=True).data)


from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class SkillStackAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get_object(self):
        stack, _ = SkillStack.objects.get_or_create(
            id=1,
            defaults={
                "languages": "Python, JavaScript, C#",
                "frameworks": "Django, React, Tailwind",
                "databases": "PostgreSQL, SQLite",
                "tools": "Git, Docker, Unity",
            }
        )
        return stack

    def get(self, request):
        return Response(
            SkillStackSerializer(self.get_object()).data
        )

    def patch(self, request):
        stack = self.get_object()
        serializer = SkillStackSerializer(
            stack, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SkillAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get(self, request):
        skills = Skill.objects.all()
        return Response(SkillSerializer(skills, many=True).data)

    def post(self, request):
        serializer = SkillSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def patch(self, request, pk):
        skill = Skill.objects.get(pk=pk)
        serializer = SkillSerializer(skill, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        Skill.objects.filter(pk=pk).delete()
        return Response({"deleted": True})


# backend/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Experience, Achievement, Certification
from .serializers import (
    ExperienceSerializer,
    AchievementSerializer,
    CertificationSerializer,
)

class ExperiencePublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = Experience.objects.all().order_by("order")
        return Response(ExperienceSerializer(data, many=True).data)
    

from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class ExperienceAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get(self, request):
        return Response(
            ExperienceSerializer(
                Experience.objects.all().order_by("order"),
                many=True
            ).data
        )

    def post(self, request):
        s = ExperienceSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        s.save()
        return Response(s.data)

    def patch(self, request, pk):
        obj = Experience.objects.get(pk=pk)
        s = ExperienceSerializer(obj, data=request.data, partial=True)
        s.is_valid(raise_exception=True)
        s.save()
        return Response(s.data)

    def delete(self, request, pk):
        Experience.objects.filter(pk=pk).delete()
        return Response({"deleted": True})

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser
from .models import Achievement, Certification
from .serializers import (
    AchievementSerializer,
    CertificationSerializer,
)



class AchievementPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = Achievement.objects.all().order_by("order")
        return Response(AchievementSerializer(data, many=True).data)

class AchievementAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get(self, request):
        achievements = Achievement.objects.all().order_by("order")
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AchievementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def patch(self, request, pk):
        achievement = Achievement.objects.get(pk=pk)
        serializer = AchievementSerializer(
            achievement,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        Achievement.objects.filter(pk=pk).delete()
        return Response({"deleted": True})


class CertificationPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = Certification.objects.all().order_by("order")
        return Response(CertificationSerializer(data, many=True).data)


from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class CertificationAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        certs = Certification.objects.all().order_by("order")
        serializer = CertificationSerializer(certs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CertificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def patch(self, request, pk):
        cert = Certification.objects.get(pk=pk)
        serializer = CertificationSerializer(
            cert,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        Certification.objects.filter(pk=pk).delete()
        return Response({"deleted": True})

# backend/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ProfileAssets
from .serializers import ProfileAssetsSerializer

class ProfileAssetsPublicView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        assets = ProfileAssets.objects.first()
        if not assets:
            return Response({})
        return Response(ProfileAssetsSerializer(assets).data)


from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSuperUser

class ProfileAssetsAdminView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        obj, _ = ProfileAssets.objects.get_or_create(id=1)
        return obj

    def get(self, request):
        return Response(
            ProfileAssetsSerializer(self.get_object()).data
        )

    def patch(self, request):
        obj = self.get_object()
        serializer = ProfileAssetsSerializer(
            obj, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
