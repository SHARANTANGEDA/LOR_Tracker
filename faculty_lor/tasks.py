from django.template import Template, Context
from django.core.mail import send_mail
from tracker_final.celery import app
from student_lor.models import *
from datetime import datetime, timezone

REPORT_TEMPLATE = """
Here's how you did till now:

{% for post in posts %}
        "{{ post.title }}": viewed {{ post.view_count }} times |

{% endfor %}
"""
REMINDER_TEMPLATE = """
This email is to remind you that {{left}} days are left to submit the Lor application of {{ details.full_name }}
You can contact the student using:

mobile: {{details.phone}},
personal_email: {{details.email}},
email: {{email}}

Thank You.
For any query or inconvenience related to application please email to lor@hyderabad.bits-pilani.ac.in
"""


@app.task
def get_celery_worker_status():
	print("HERE")
	i = app.control.inspect()
	stats = i.stats()
	registered_tasks = i.registered()
	active_tasks = i.active()
	scheduled_tasks = i.scheduled()
	result = {
		'stats': stats,
		'registered_tasks': registered_tasks,
		'active_tasks': active_tasks,
		'scheduled_tasks': scheduled_tasks
	}
	return result


@app.task
def send_application_remainder():
	for item in FacultyListLor.objects.filter():
		lor = Lor.objects.get(id=item.lor.id)
		diff = (datetime.now(timezone.utc) - lor.deadline).days
		print('Here '+str(diff))
		if diff == 15 and not item.days_15:
			details = StudentDetails.objects.get(user=lor.user.id)
			template = Template(REMINDER_TEMPLATE)
			result = FacultyListLor.objects.filter(lor=item.lor.id, faculty=item.faculty.id).update(days_15=True)
			send_mail(
				'Reminder: 15 days to submit Lor of ' + str(details.full_name),
				template.render(context=Context({'email': lor.user.email, 'details': details, 'left': str(15)})),
				'ghotden@gmail.com',
				[item.faculty.email],
				fail_silently=False,
			)
		elif diff == 7 and not item.days_7:
			details = StudentDetails.objects.get(user=lor.user.id)
			template = Template(REMINDER_TEMPLATE)
			result = FacultyListLor.objects.filter(lor=item.lor.id, faculty=item.faculty.id).update(days_7=True)
			send_mail(
				'Reminder: 7 days to submit Lor of ' + str(details.full_name),
				template.render(context=Context({'email': lor.user.email, 'details': details, 'left': str(7)})),
				'ghotden@gmail.com',
				[item.faculty.email],
				fail_silently=False,
			)
		elif diff == 3 and not item.days_3:
			details = StudentDetails.objects.get(user=lor.user.id)
			template = Template(REMINDER_TEMPLATE)
			result = FacultyListLor.objects.filter(lor=item.lor.id, faculty=item.faculty.id).update(days_3=True)
			send_mail(
				'Reminder: 3 days to submit Lor of ' + str(details.full_name),
				template.render(context=Context({'email': lor.user.email, 'details': details, 'left': str(3)})),
				'ghotden@gmail.com',
				[item.faculty.email],
				fail_silently=False,
			)
		elif diff == 1 and not item.days_1:
			details = StudentDetails.objects.get(user=lor.user.id)
			template = Template(REMINDER_TEMPLATE)
			result = FacultyListLor.objects.filter(lor=item.lor.id, faculty=item.faculty.id).update(days_1=True)
			send_mail(
				'Reminder: 1 day to submit Lor of ' + str(details.full_name),
				template.render(context=Context({'email': lor.user.email, 'details': details, 'left': str(1)})),
				'ghotden@gmail.com',
				[item.faculty.email],
				fail_silently=False,
			)
