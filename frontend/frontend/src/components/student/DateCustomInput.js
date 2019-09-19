import React, { forwardRef } from 'react';
import DatePickerInputField from "../common/DatePickerInputField";

const CustomDateInput = (props, _ref) => {
	return (
		<DatePickerInputField placeholder="Click to select deadline"
														type="text" value={props.value} readOnly onClick={props.onClick}
														name="programName"
			/>
		)

};

export default forwardRef(CustomDateInput);