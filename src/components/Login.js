import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from './api-services';
import { enqueueSnackbar } from 'notistack';

const LoginForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const passwordInputRef = useRef(null);
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    const loginData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    BaseUrl.post('auth/login/', loginData).then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      enqueueSnackbar('User Login Successfully!', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      navigate("/dashboard");
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar('Username or Password is incorrect!', { variant: 'error', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });

    })
    

  };

  const validateEmail = () => {
    if(!emailInputRef.current.value.includes('@')){
      setEmailError('Invalid Email');
    }else{
        setEmailError('');
    }
  }

  const validatePassword = () => {
    if (passwordInputRef.current.value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl bg-white		h-100   rounded-md p-4">
        <h2 className="text-center text-5xl mb-4  p-4 text-black	">Login</h2>
        <form>
        <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              onBlur={validateEmail}
              className="w-full p-2 border border-gray-300"
            />
            {emailError && (
              <p className="text-red-500 text-xs">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              onBlur={validatePassword}
              className="w-full p-2 border border-gray-300"
            />
            {passwordError && (
              <p className="text-red-500 text-xs">{passwordError}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 mb-4"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/registration" className="text-sky-600 cursor-pointer underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
