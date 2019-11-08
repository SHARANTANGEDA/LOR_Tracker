from rest_framework.exceptions import ValidationError

"""
	Courses_done:
			[{
				courseCode:''
				year:''
				sem:''			
			}]
	"""


# print('Before: ', item)
# parsed_json = (json.loads(item))
# print(json.dumps(parsed_json, indent=4, sort_keys=True))
# print("Parsed:", parsed_json)


def validate_lor_submission(data):
	errors = {}
	for item in data:
		courses_done = item['courses_done']
		projects_done = item['projects_done']
		thesis_done = item['thesis_done']
		others = item['others']
		status = item['status']
		if (status is True and len(others) == 0) or (
				status is False and (len(courses_done) == 0 and len(projects_done) == 0 and len(thesis_done) == 0)):
			errors["others"] = "If you haven't done anything under the professor please enter information in others"
			raise ValidationError(errors)
		print('Here:', courses_done, projects_done, thesis_done, others, status, len(courses_done), len(projects_done),
			  len(thesis_done))
		for course in courses_done:
			if len(course['courseCode']) == 0 or not course['sem'] or not course['year']:
				errors["courses_done"] = "You have not entered the input properly, the request could not be submitted"
				raise ValidationError(errors)
		for project in projects_done:
			if len(project['projectTitle']) == 0 or not project['year']:
				errors["projects_done"] = "You have not entered the input properly, the request could not be submitted"
				raise ValidationError(errors)
		for thesis in thesis_done:
			if len(thesis['thesisTitle']) == 0 or not thesis['year']:
				errors["thesis_done"] = "You have not entered the input properly, the request could not be submitted"
				raise ValidationError(errors)


def validate_edit_lor_submission(data):
	errors = {}
	courses_done = data['courses_done']
	projects_done = data['projects_done']
	thesis_done = data['thesis_done']
	others = data['others']
	status = data['status']
	if (status is True and len(others) == 0) or (
			status is False and (len(courses_done) == 0 and len(projects_done) == 0 and len(thesis_done) == 0)):
		errors["others"] = "If you haven't done anything under the professor please enter information in others"
		print('1', errors)
		raise ValidationError(errors)
	print('Here:', courses_done, projects_done, thesis_done, others, status, len(courses_done), len(projects_done),
		  len(thesis_done))
	for course in courses_done:
		if len(course['courseCode']) == 0 or not course['sem'] or not course['year']:
			errors["courses_done"] = "You have not entered the input properly, the request could not be submitted"
			print('2', errors)
			raise ValidationError(errors)
	for project in projects_done:
		if len(project['projectTitle']) == 0 or not project['year']:
			errors["projects_done"] = "You have not entered the input properly, the request could not be submitted"
			print('3', errors)
			raise ValidationError(errors)
	for thesis in thesis_done:
		if len(thesis['thesisTitle']) == 0 or not thesis['year']:
			errors["thesis_done"] = "You have not entered the input properly, the request could not be submitted"
			print('4', errors)
			raise ValidationError(errors)

# courses_done = data['courses_done']
# projects_done = data['projects_done']
# thesis_done = data['thesis_done']
# others = data['others']
# status = data['status']
# print(courses_done, projects_done, thesis_done, others, status)
