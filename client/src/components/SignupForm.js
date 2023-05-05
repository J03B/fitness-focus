import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';

// GraphQL backend
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  // ADD MUTATION for form data above
  const [ addUser ] = useMutation(ADD_USER);
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addUser({
        variables: { 
          firstName: userFormData.firstName, 
          lastName: userFormData.lastName, 
          email: userFormData.email, 
          password: userFormData.password
         },
      });

      const token = data.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        {showAlert && <Alert variant='standard' severity='error' color='error'>
          Something went wrong with your signup!
        </Alert>}

        <div className='mb-3'>
          <TextField
            type='text'
            label='First Name'
            name='firstName'
            id='firstName'
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
            style={{width:"100%"}}
          />
        </div>

        <div className='mb-3'>
          <TextField
            type='text'
            label='Last Name'
            name='lastName'
            id='lastName'
            onChange={handleInputChange}
            value={userFormData.lastName}
            required
            style={{width:"100%"}}
          />
        </div>

        <div className='mb-3'>
          <TextField
            type='email'
            label='Email Address'
            name='email'
            id='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            style={{width:"100%"}}
          />
        </div>

        <div className='mb-3'>
          <TextField
            type='password'
            label='Password'
            name='password'
            id='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            style={{width:"100%"}}
          />
        </div>
        <Button
          disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
