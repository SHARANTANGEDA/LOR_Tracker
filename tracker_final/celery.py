from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tracker_final.settings')
app = Celery('tracker_final')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


app.conf.timezone = 'UTC'
app.conf.beat_schedule = {
    'send-reminder-every-single-minute': {
        'task': 'faculty_lor.tasks.send_application_remainder', 'schedule': crontab()},
    'test': {
        'task': 'faculty_lor.tasks.get_celery_worker_status', 'schedule': crontab()}}
