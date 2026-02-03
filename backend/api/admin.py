from django.contrib import admin
from .models import Profile, Hero, Project, SkillStack, ProfileAssets, Skill

admin.site.register(Profile)
admin.site.register(Hero)
admin.site.register(Project)
admin.site.register(SkillStack)
admin.site.register(ProfileAssets)
admin.site.register(Skill)