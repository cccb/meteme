
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial')
    ]

    operations = [
        migrations.RunSQL(
            "INSERT INTO store_priceset (name) VALUES ('default')",
            "DELETE FROM store_priceset WHERE name = 'default'"
        )
    ]

