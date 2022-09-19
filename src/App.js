import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import auth from './services/authService';
import RequireAuth from './components/common/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const result = auth.getCurrentUser();
    setUser(result);
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user}/>
      <main className="container">
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<Logout />} />
          <Route
            path='/movies/:id'
            element={
              // Implementing protected routes.
              <RequireAuth redirectTo='/login'>
                <MovieForm />
              </RequireAuth>
            }
          />
          <Route path='/movies' element={<Movies user={user} />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/rentals' element={<Rentals />} /> 
          <Route path='/not-found' element={<NotFound />} />  
          <Route path='/' element={<Navigate replace to='/movies' />} /> 
          <Route path='*' element={<Navigate replace to='/not-found' />} /> 
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
