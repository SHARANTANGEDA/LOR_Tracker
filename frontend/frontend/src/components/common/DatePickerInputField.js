import React from 'react'
import classnames from 'classnames'
import {PropTypes} from 'prop-types'

const DatePickerInputField = ({
  name,
  placeholder,
  value,
  type,
  onClick}) => {
  return (
    <div className="form-group">
      <input type={type} readOnly
             className={classnames('form-control form-control-lg w-75')}
             placeholder={placeholder}
             name={name}
             value={value} onClick={onClick}/>
    </div>
  );
};

DatePickerInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

DatePickerInputField.defaultProps = {
  type: 'text'
};

export default DatePickerInputField