import { TextFieldProps } from '@mui/material';
import { FormControlLabelProps } from '@mui/material';

export type FormTextFieldProps = TextFieldProps & {
  name: string;
};

export type FormCheckboxProps = Omit<FormControlLabelProps, 'control'> & {
  name: string;
};