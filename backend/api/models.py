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
