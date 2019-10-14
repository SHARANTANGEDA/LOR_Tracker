const convertToBackendFormat = (id, list) => {
	let selectArray = [];
	console.log({LIST: list})
	list.map(item => {
		selectArray.push({lor_id: id, faculty_id:item.faculty_id, courses_done: item.courses_done,
			projects_done: item.projects_done, thesis_done: item.thesis_done, status: item.status, others:item.others})
	});
	return selectArray;
};

export default convertToBackendFormat