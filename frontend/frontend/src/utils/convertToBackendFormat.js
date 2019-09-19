const convertToBackendFormat = (id, list) => {
	let selectArray = [];
	console.log({LIST: list})
	list.map(item => {
		selectArray.push({lor_id: id, faculty_id:item})
	});
	return selectArray;
};

export default convertToBackendFormat