from django.db import models
from cloudinary.models import CloudinaryField
# Create your models here.from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    open_to = models.CharField(max_length=100)

    skills = models.TextField(help_text="Comma separated skills")

    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    resume = models.URLField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Hero(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    intro = models.TextField()

    cta_text = models.CharField(
        max_length=50, blank=True
    )
    cta_link = models.URLField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Hero Section"



class Project(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    
    use_cases = models.TextField(
        blank=True,
        help_text="Project use cases or key features (comma separated)"
    )
    
    image = CloudinaryField("image")

    tech_stack = models.CharField(
        max_length=300,
        help_text="Comma separated tech stack"
    )

    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)

    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    
    
from django.db import models

class SkillStack(models.Model):
    languages = models.TextField(help_text="Comma separated")
    frameworks = models.TextField(help_text="Comma separated")
    databases = models.TextField(help_text="Comma separated")
    tools = models.TextField(help_text="Comma separated")

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Skills & Tech Stack"


class Skill(models.Model):
    SKILL_TYPE_CHOICES = [
        ('language', 'Programming Language'),
        ('framework', 'Framework/Library'),
        ('database', 'Database'),
        ('tool', 'Tool/Platform'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    skill_type = models.CharField(
        max_length=20,
        choices=SKILL_TYPE_CHOICES,
        default='other'
    )
    proficiency = models.PositiveIntegerField(
        default=50,
        help_text="Proficiency level (0-100)"
    )
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-proficiency', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_skill_type_display()}) - {self.proficiency}%"

# backend/api/models.py
class Experience(models.Model):
    role = models.CharField(max_length=150)
    organization = models.CharField(max_length=150)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True)
    description = models.TextField()

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.role} @ {self.organization}"

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=150)
    certificate_url = models.URLField(blank=True)
    
    image = models.ImageField(
        upload_to="certificates/",
        blank=True,
        null=True,
        help_text="Certificate badge or logo"
    )

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

from django.db import models

class ProfileAssets(models.Model):
    resume = models.FileField(
        upload_to="resume/",
        blank=True,
        null=True
    )

    profile_photo = models.ImageField(
        upload_to="profile/",
        blank=True,
        null=True
    )

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Profile Assets"
