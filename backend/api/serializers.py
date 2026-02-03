# api/serializers.py
from rest_framework import serializers
from .models import Profile, Hero, Project, SkillStack, Skill

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


class SkillSerializer(serializers.ModelSerializer):
    skill_type_display = serializers.CharField(source='get_skill_type_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")
        
        
# backend/api/serializers.py
from rest_framework import serializers
from .models import Experience, Achievement, Certification

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"
        read_only_fields = ("id",)

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"
        read_only_fields = ("id",)

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"
        read_only_fields = ("id",)

from rest_framework import serializers
from .models import ProfileAssets

class ProfileAssetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileAssets
        fields = "__all__"
        read_only_fields = ("id", "updated_at")
