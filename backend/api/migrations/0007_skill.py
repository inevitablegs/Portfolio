# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_profileassets'),
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('skill_type', models.CharField(
                    choices=[
                        ('language', 'Programming Language'),
                        ('framework', 'Framework/Library'),
                        ('database', 'Database'),
                        ('tool', 'Tool/Platform'),
                        ('other', 'Other'),
                    ],
                    default='other',
                    max_length=20
                )),
                ('proficiency', models.PositiveIntegerField(default=50, help_text='Proficiency level (0-100)')),
                ('order', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['order', '-proficiency', 'name'],
            },
        ),
    ]
