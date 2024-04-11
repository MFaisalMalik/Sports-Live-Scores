import React from 'react';
import './SignIn_SignUp.css';

export default function SignIn() {
  return (
    <div className='signup-signin-container'>
      <div className='header'>
        <div className='text '>Sign In</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
          <div className='input'>
            <img src='/images/email.png' alt='' />
            <input type='email' placeholder='Email Id' />
          </div>  
          <div className='input'>
            <img src='/images/password.png' alt='' />
            <input type='password' placeholder='Password' />
          </div>  
      </div>
      <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>
      <div className='submit-container'>
        <div className='submit'>Sign In</div>
      </div>
    </div>
  );
}
