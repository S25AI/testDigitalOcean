import React from 'react';
import {css} from 'linaria';
import {colors} from '../../constants/styles/common';

const inputCls = css`
  height: 48px;
  line-height: 48px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 16px;
  display: block;
  width: 100%;
  transition: 0.2s ease-in-out border-color;
  will-change: border-color;

  &:focus {
    border: 1px solid ${colors.blue};
    outline: none;
  }
`;

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
    className={inputCls}
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