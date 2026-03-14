# backend/api/migrations/0010_fix_project_image_cloudinary.py
from django.db import migrations
import cloudinary.models

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0009_certification_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]