// see SignupForm.js for comments
import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';

// Refactor to switch to GraphQL login backend
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // Adding mutation to login
  const [login, {error}] = useMutation(LOGIN);

  // Handles the input changes by updating it in our State variable
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {showAlert && <Alert variant='standard' severity='error' color='error' className='mb-3'>
          Something went wrong with your login credentials!
        </Alert>}
        <div className='mb-3'>
          <TextField
            label='Email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            style={{width:"100%"}}
          />
        </div>

        <div className='mb-3'>
          <TextField
            label='Password'
            name='password'
            type='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            style={{width:"100%"}}
          />
        </div>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
