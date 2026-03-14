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
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
    
    def get_image_url(self, obj):
        if obj.image:
            return str(obj.image.url)  # Explicitly convert to string
        return None
    
    
    
        
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
    image = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = "__all__"
        read_only_fields = ("id",)

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

from rest_framework import serializers
from .models import ProfileAssets

class ProfileAssetsSerializer(serializers.ModelSerializer):
    profile_photo = serializers.SerializerMethodField()
    resume = serializers.SerializerMethodField()

    class Meta:
        model = ProfileAssets
        fields = "__all__"
        read_only_fields = ("id", "updated_at")

    def get_profile_photo(self, obj):
        if obj.profile_photo:
            return obj.profile_photo.url
        return None

    def get_resume(self, obj):
        if obj.resume:
            return obj.resume.url
        return None
