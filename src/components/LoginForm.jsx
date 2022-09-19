import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Input from './common/Input';
import Form from './common/Form';
import auth from './../services/authService';

const LoginForm = () => {
   const location = useLocation();

   const formData = {
      username: '',
      password: ''
   };

   const formSchema = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password')
   };

   const doSubmit = async user => {
      try {
         await auth.login(user);
         const { state } = location;
         // window.location causes a full reload of the application so that logged in user details can load up
         window.location = state ? state.from.pathname : '/'; 
      } catch (error) {
         if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data;
            toast.error(errorMessage);
         }
      }
   }

   if (auth.getCurrentUser()) 
      return <Navigate replace to='/' />;

   return (
      <div>
         <h1>Login</h1>
         <Form formData={formData} formSchema={formSchema} doSubmit={doSubmit} submitButton='Login'>
            <Input 
               label='Username'
               name='username' 
            />
            <Input  
               label='Password' 
               name='password' 
               type='password' 
            />
         </Form>
      </div>
   );
}
 
export default LoginForm;
