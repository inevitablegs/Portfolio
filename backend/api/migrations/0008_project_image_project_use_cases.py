# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_skill'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='image',
            field=models.ImageField(blank=True, help_text='Project screenshot or thumbnail', null=True, upload_to='projects/'),
        ),
        migrations.AddField(
            model_name='project',
            name='use_cases',
            field=models.TextField(blank=True, help_text='Project use cases or key features (comma separated)'),
        ),
    ]
