import React from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { FormTextFieldProps } from '../types/form';

const FormTextField: React.FC<FormTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value);
    setFieldTouched(name, true, false);
  };

  return (
    <TextField
      {...field}
      {...props}
      onChange={handleChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default FormTextField;