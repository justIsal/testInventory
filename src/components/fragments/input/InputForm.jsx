import { Input, Typography } from '@material-tailwind/react';
import React from 'react';

const InputForm = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  required = true,
  name,
  disabled = false,
  classLabel,
}) => {
  return (
    <>
      <Typography color="blue-gray" className={`-mb-5  ${classLabel}`}>
        {label}
      </Typography>
      <Input
        size="lg"
        placeholder={placeholder}
        className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${className}`}
        labelProps={{
          className: 'hidden',
        }}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        disabled={disabled}
      />
    </>
  );
};
export default InputForm;
