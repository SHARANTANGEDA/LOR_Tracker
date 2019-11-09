import React from "react";
import getLocalDate from "../../utils/getLocalDate";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatFacultyAcceptedLorData = (data) => {
	console.log(data)
	let formatedData = [];

	data.map(row => {
		let content = {
			studentId: row.student_details_profile.student_id,
			studentName: capitalizeFirstLetter(row.student_details_general.first_name + ' '+row.student_details_general.last_name),
			email: row.student_details_general.email,
			purpose: row.lor_details.purpose,
			deadline: getLocalDate(row.lor_details.deadline),
			viewButton: row,
			markAsComplete: row
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatFacultyAcceptedLorData

