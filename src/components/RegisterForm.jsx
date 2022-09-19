import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Input from './common/Input';
import Form from './common/Form';
import { register } from './../services/userService';
import auth from '../services/authService';

const RegisterForm = () => {
   const formData = {
      username: '',
      password: '',
      name: ''
   };

   const formSchema = {
      username: Joi.string().required().email().label('Username'),
      password: Joi.string().required().min(5).label('Password'),
      name: Joi.string().required().label('Name')
   };

   const doSubmit = async user => {
      try {
         const { headers } = await register(user);
         auth.loginWithJwt(headers['x-auth-token']);
         window.location = '/'; // to cause a full reload of the application so that logged in user details can load up
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data;
            toast.error(errorMessage);
         }
      }
   }

   return (
      <div>
         <h1>Register</h1>
         <Form formData={formData} formSchema={formSchema} doSubmit={doSubmit} submitButton='Register'>
            <Input 
               label='Username' 
               name='username'
               type='email' 
            />
            <Input  
               label='Password'
               name='password'
               type='password' 
            />
            <Input 
               label='Name' 
               name='name' 
            />
         </Form>
      </div>
   );
}
 
export default RegisterForm;
