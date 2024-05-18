import React, { useState, useEffect, useRef } from 'react';
import './SignIn_SignUp.css';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doCreateUserWithEmailAndPassword, doSendEmailVerification, } from '../../firebase/auth'

export default function SignUp() {
  const history = useHistory();
  const { userLoggedIn } = useAuth()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering)
      return true;

    if (password != confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsRegistering(true);
    await doCreateUserWithEmailAndPassword(email, password)
      .catch(error => {
        setErrorMessage(error.message);
        setIsRegistering(false);
      });

  }

  return (
    <div className='signup-signin-container'>
      {userLoggedIn && history.push('/', true)}

      <div className='header'>
        <div className='text '>Sign Up</div>
        <div className='underline'></div>
      </div>

      <form className='inputs' onSubmit={handleSubmit}>
        <div className='input'>
          <img src='/images/user.png' alt='' />
          <input
            disabled={isRegistering}
            value={name}
            autoComplete='name'
            required
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Name' />
        </div>

        <div className='input'>
          <img src='/images/email.png' alt='' />
          <input
            disabled={isRegistering}
            value={email}
            autoComplete='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email Id'
          />
        </div>

        <div className='input'>
          <img src='/images/password.png' alt='' />
          <input
            disabled={isRegistering}
            value={password}
            autoComplete='new-password'
            required
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
        </div>

        <div className='input'>
          <img src='/images/password.png' alt='' />
          <input
            disabled={isRegistering}
            value={confirmPassword}
            autoComplete='off'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm Password'
          />
        </div>

        {errorMessage && (
          <span className='error-message'>{errorMessage}</span>
        )}

        <div className='submit-container'>
          <button
            disabled={isRegistering}
            type='submit'
            className='submit'>
            Sign Up
          </button>
        </div>

        <div className="text-sm text-center">
          Already have an account? {'   '}
          <Link to={'/sign-in'} className="text-center text-sm hover:underline font-bold">Continue</Link>
        </div>
      </form>
    </div>
  );
}
