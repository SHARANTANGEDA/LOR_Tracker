const validateLorSubmission = data => {
	const errors={};
	data =data[0];
	if(data.status && data.others.length===0) {
			errors.others="This field can't be blank"
	}
	if(!data.status) {
		if(data.courses_done && data.courses_done.length===0 && data.projects_done && data.projects_done.length===0 &&
			data.thesis_done && data.thesis_done.length===0) {
			errors.allEmpty="You have add at least one of the following for lor to be accepted, or choose others"
		}
		console.log({courses_done: data.courses_done, len: data})
		if(data.courses_done.length!==0) {
			data.courses_done.map(item => {
				if(item.courseCode.length===0) {
					errors.courses_done[data.courses_done.indexOf(item)].courseCode="Course Code can't be empty"
				}
				if(item.sem===null || item.sem==='' || item.sem.length===0) {
					errors.courses_done[data.courses_done.indexOf(item)].sem="You must select the semester"
				}
				if(item.year===null || item.year==='' || item.year.length===0) {
					errors.courses_done[data.courses_done.indexOf(item)].year="You must select the year"
				}
			})
		}
		if(data.projects_done.length!==0) {
			data.projects_done.map(item => {
				if(item.projectTitle.length===0) {
					errors.projects_done[data.projects_done.indexOf(item)].projectTitle="Project title can't be empty"
				}
				if(item.year===null || item.year==='' || item.year.length===0) {
					errors.projects_done[data.projects_done.indexOf(item)].year="You must select the year"
				}
			})
		}
		if(data.thesis_done.length!==0) {
			data.thesis_done.map(item => {
				if(item.thesisTitle.length===0) {
					errors.thesis_done[data.thesis_done.indexOf(item)].thesisTitle="Title can't be empty"
				}
				if(item.year===null || item.year==='' || item.year.length===0) {
					errors.thesis_done[data.thesis_done.indexOf(item)].year="You must select the year"
				}
			})
		}
	}
	return errors
};


export default validateLorSubmission;
