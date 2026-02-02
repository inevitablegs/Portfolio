from django.db import models

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
