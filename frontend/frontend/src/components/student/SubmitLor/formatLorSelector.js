import getLocalDate from "../../../utils/getLocalDate";
import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatLorSelector = (data) => {
	let formatedData = [];
	data.map(row => {
		let content = {
			selectLor: row,
			purpose: row.purpose,
			university: row.university_name,
			deadline: getLocalDate(row.deadline),
			programName: row.program_name,
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatLorSelector

