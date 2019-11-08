import getLocalDate from "../../../utils/getLocalDate";
import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatSavedLorData = (data) => {
	let formatedData = [];
	data.map(row => {
		console.log(row.expired);
		let expired = null;
		if(row.expired) {
			expired = 'expired'
		}else {
			expired = 'active'
		}
		let content = {
			purpose: row.purpose,
			university: capitalizeFirstLetter(row.university_name),
			programName: row.program_name,
			deadline: getLocalDate(row.deadline),
			status: expired,
			editLor: row,
			deleteLor: row.id
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatSavedLorData

