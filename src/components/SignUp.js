import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr'
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from './api-services';
import { enqueueSnackbar } from 'notistack';

const SignupForm = () => {

  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loader,setLoader] = useState(false);


  const handleSignup = () => {
    if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
      setLoader(true);
      // Perform signup logic here
      const signupData = {
        full_name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };
      BaseUrl.post('auth/register/', signupData).then((response) => {
        setLoader(false);
        enqueueSnackbar('User Created Successfully!', { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        navigate("/login");
      })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        })
    }
  };
  const validateEmail = () => {
    if (!emailInputRef.current.value.includes('@')) {
      setEmailError('Invalid Email');
    } else {
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

  const validateConfirmPassword = () => {
    if (confirmPasswordInputRef.current.value !== passwordInputRef.current.value) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl bg-white		h-100   rounded-md p-4 ">
        <h1 className="text-center text-5xl mb-4  p-4 text-black	  ">Create Account</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="w-full p-2 border border-gray-300"
            />
            {/* Add error message display for name validation if needed */}
          </div>

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

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordInputRef}
              onBlur={validateConfirmPassword}
              className="w-full p-2 border border-gray-300"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-xs">{confirmPasswordError}</p>
            )}
          </div>
          {!loader ?
          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white font-bold py-2  mb-4 rounded-md hover:bg-blue-700 text-xl"
          >
            Signup
          </button>
          :
          <button disabled type="button" class="w-full text-xl rounded-md py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hovrounded-mder:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center" style={{display:'flex',justifyContent:'center'}}>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
            Loading...
          </button>
          }
        </form>
        <p className="text-center">
          Back to Login ?{' '}
          <Link to="/login" className="text-sky-600 cursor-pointer underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
