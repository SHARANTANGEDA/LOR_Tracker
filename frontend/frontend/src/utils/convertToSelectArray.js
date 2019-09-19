const convertToSelectArray = (univ) => {
	let selectArray = [];
	console.log({UNIV: univ})
	if(univ.length===0) {
		return [{ value: null, label: 'Add your university' }]
	}
	univ.map(item => {
		selectArray.push({value: item.university_name, label: item.university_name})
	});
	return selectArray;
};

export default convertToSelectArray