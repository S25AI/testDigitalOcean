import React from 'react';

const TextArea = ({
  value,
  onChange,
  placeholder,
  name,
  rows,
  cols,
  required
}) => (
  <textarea placeholder={placeholder}
    rows={rows}
    cols={cols}
    onChange={(e) => onChange(e.target.value, name)}
    required
    value={value} />
);

TextArea.defaultProps = {
  placeholder: '',
  value: '',
  name: '',
  rows: 15,
  cols: 60
};

export default TextArea;