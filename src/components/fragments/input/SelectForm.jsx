import { Select, Option, Typography } from '@material-tailwind/react';
import React from 'react';

const SelectForm = ({
  label,
  placeholder,
  className,
  required = true,
  listOption,
  value,
  onChange,
  disabled = false,
  postfix,
}) => {
  return (
    <div className="w-full">
      <Typography>{label}</Typography>
      <Select
        label="Select Version"
        size="lg"
        placeholder={placeholder}
        className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${className}`}
        // label={label}
        labelProps={{
          className: 'hidden',
        }}
        // type={type}
        value={value}
        onChange={(e) => onChange(e)}
        required={required}
        disabled={disabled}
      >
        {listOption &&
          listOption.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
      </Select>
    </div>
  );
};
export default SelectForm;
