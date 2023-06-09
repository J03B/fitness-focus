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
    console.log('handleFormSubmit running!');
    console.log(event);
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    console.log('form:');
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('userFormData');
    console.log(userFormData);
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log('DATA:');
      console.log(data);
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

  const style = { width: "100%", my: 1 };

  return (
    <>
      <form noValidate validated={validated.toString()} onSubmit={handleFormSubmit}>
        {showAlert && <Alert variant='standard' severity='error' color='error' sx={{mb:2}}>
          Something went wrong with your login credentials!
        </Alert>}
        <div>
          <TextField
            label='Email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            sx={ style }
          />
        </div>

        <div>
          <TextField
            label='Password'
            name='password'
            type='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            sx={ style }
          />
        </div>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
          sx={{ my: 1 }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
