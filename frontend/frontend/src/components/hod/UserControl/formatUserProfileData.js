import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatUserProfileData = (data) => {
	console.log(data)
	let formatedData = [];

	data.map(row => {
		let content = {
			studentId: row.student_details_profile.student_id,
			studentName: capitalizeFirstLetter(row.student_details_general.first_name + ' '+row.student_details_general.last_name),
			email: row.student_details_general.email,
			contactNo: row.student_details_profile.phone,
			cgpa: row.student_details_profile.cgpa,
			graduationStatus: row.student_details_profile,
			viewProfile: row
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatUserProfileData

