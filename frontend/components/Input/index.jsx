import React from 'react';

const Input = ({
  value,
  onChange,
  placeholder,
  type,
  name,
  autoFocus,
  required
}) => (
  <input type={type}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value, name)}
    autoFocus={autoFocus}
    required={required}
    value={value} />
);

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
  name: '',
  autoFocus: false
};

export default Input;