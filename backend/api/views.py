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
from .models import Profile
from .serializers import ProfileSerializer

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
