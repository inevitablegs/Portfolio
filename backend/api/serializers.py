# backend/api/serializers.py
from rest_framework import serializers
from .models import (
    Profile, Hero, Project, SkillStack, Skill,
    Experience, Achievement, Certification, ProfileAssets
)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"
        
class ProjectSerializer(serializers.ModelSerializer):
    # Tell DRF to accept file uploads for this field
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Project
        fields = "__all__"

    # Override to return string URL instead of a CloudinaryResource object
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url if hasattr(instance.image, 'url') else str(instance.image)
        else:
            data['image'] = None
        return data

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
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Certification
        fields = "__all__"
        read_only_fields = ("id",)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url if hasattr(instance.image, 'url') else str(instance.image)
        else:
            data['image'] = None
        return data

class ProfileAssetsSerializer(serializers.ModelSerializer):
    profile_photo = serializers.ImageField(required=False, allow_null=True)
    resume = serializers.FileField(required=False, allow_null=True)
    
    class Meta:
        model = ProfileAssets
        fields = "__all__"
        read_only_fields = ("id", "updated_at")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.profile_photo:
            data['profile_photo'] = instance.profile_photo.url if hasattr(instance.profile_photo, 'url') else str(instance.profile_photo)
        else:
            data['profile_photo'] = None
            
        if instance.resume:
            data['resume'] = instance.resume.url if hasattr(instance.resume, 'url') else str(instance.resume)
        else:
            data['resume'] = None
        return data