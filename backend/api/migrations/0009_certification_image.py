# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_project_image_project_use_cases'),
    ]

    operations = [
        migrations.AddField(
            model_name='certification',
            name='image',
            field=models.ImageField(blank=True, help_text='Certificate badge or logo', null=True, upload_to='certificates/'),
        ),
    ]
