import React from "react";

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
const formatActiveUsersData = (data) => {
	console.log(data)
	let formatedData = [];

	data.map(row => {
		let content = {
			userId: row.id,
			email: row.email,
			firstName: row.first_name,
			lastName: row.last_name,
			role: row.role,
		};
		formatedData.push(content);
	});
	return formatedData;
};

export default formatActiveUsersData

