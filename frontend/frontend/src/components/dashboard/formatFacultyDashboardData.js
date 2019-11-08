import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatFacultyDashboardData = (data) => {
	let formatedData = [];
	data.map(row => {
		let content = {
			selectFaculty: row,
			facultyName: capitalizeFirstLetter(row.first_name + ' '+row.last_name),
			facultyEmail: row.email,
			departmentName: row.department_name,
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatFacultyDashboardData

