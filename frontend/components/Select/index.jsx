import React from 'react';

const Select = ({
  value,
  onChange,
  name,
  options,
  required
}) => (
  <select name={name}
    onChange={(e) => onChange(e.target.value, name)}
    required={required}
    value={value}>
      {
        options.map((option, index) => (
          <option key={index.toString()} value={option}>{option}</option>
        ))
      }
    </select>
);

Select.defaultProps = {
  options: [],
  placeholder: '',
  value: '',
  name: ''
};

export default Select;