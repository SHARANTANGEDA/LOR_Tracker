const returnFilterList = (data, element) => {
	return data.filter(item => item.faculty_name.toLowerCase().includes(element.toLowerCase()))
};

export default returnFilterList