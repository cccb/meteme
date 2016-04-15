from __future__ import unicode_literals

from django.apps import AppConfig

class MeteConfig(AppConfig):
    name = 'mete'
    verbose_name = 'Mete 98 (ME)'

    def ready(self):
        """
        Initialize signals and everything else,
        which should only be run once, when the app is 'ready'.
        """
        # Connect signal handlers
        import mete.signals


