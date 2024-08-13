import { Textarea, Typography } from '@material-tailwind/react';
import React from 'react';

export default function TextAreaForm({
  label,
  onChange,
  value,
  placeholder,
  required = true,
  className,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <Typography className="mb-2">{label}</Typography>
      <Textarea
        // label={label}
        labelProps={{
          className: 'hidden',
        }}
        onChange={onChange}
        value={value}
        required={required}
        className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${className}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
