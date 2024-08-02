'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Typography, Box } from '@mui/material';
import { LoginFormValues } from '@/types/auth';
import { LOGIN_API_URL } from '@/utils/apiURLS';
import { setUserAuth } from '@/utils/auth';
import FormTextField from '@/Components/FormTextField';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { APP_PRODUCTS_LIST_URL } from '@/utils/appURLS';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')

  ,
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

const LoginPage = () => {
  const router = useRouter()
  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await axios.post(LOGIN_API_URL, values);
      const userData = {
        email: response?.data?.email,
        firstName: response?.data?.firstName,
        gender: response?.data?.gender,
        id: response?.data?.id,
        image: response?.data?.image,
        lastName: response?.data?.lastName,
        refreshToken: response?.data?.refreshToken,
        token: response?.data?.token,
        username: response?.data?.username,
      }
      // Store user info and token in cookies
      setUserAuth(userData, response?.data?.token);

      // Redirect to products page
      router.push(APP_PRODUCTS_LIST_URL);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorResponse = error?.response?.data?.message
      toast.error(errorResponse ? errorResponse : "something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
      })
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, isValid }) => (
            <Form noValidate>
              <FormTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <FormTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginPage;