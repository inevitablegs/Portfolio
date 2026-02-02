# api/serializers.py
from rest_framework import serializers
from .models import Profile, Hero, Project, SkillStack

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        
class SkillStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillStack
        fields = "__all__"
        read_only_fields = ("id", "updated_at")