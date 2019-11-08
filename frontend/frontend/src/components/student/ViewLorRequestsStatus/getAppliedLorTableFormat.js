import getLocalDate from "../../../utils/getLocalDate";
import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const getAppliedLorTableFormat = (data) => {
	let formatedData = [];
	data.map(row => {
		let content = {
			facultyName: capitalizeFirstLetter(row.faculty.first_name+' '+row.faculty.last_name),
			facultyEmail: row.faculty.email,
			createdOn: getLocalDate(row.lor.created_at),
			university: row.lor.university_name,
			deadline: getLocalDate(row.lor.deadline),
			applicationStatus: row.application_status,
			editButton: row,
			withdraw: row
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default getAppliedLorTableFormat

