import React from 'react';
import './SignIn_SignUp.css';

export default function SignUp() {
  return (
    <div className='signup-signin-container'>
      <div className='header'>
        <div className='text '>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
            <img src='/images/user.png' alt='' />
            <input type='text' placeholder='Name' />
          </div>  
          <div className='input'>
            <img src='/images/email.png' alt='' />
            <input type='email' placeholder='Email Id' />
          </div>  
          <div className='input'>
            <img src='/images/password.png' alt='' />
            <input type='password' placeholder='Password' />
          </div>  
      </div>
      <div className='submit-container'>
        <div className='submit'>Sign Up</div>
      </div>
    </div>
  );
}
