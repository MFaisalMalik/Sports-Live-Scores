import React from 'react';
import { useHistory , Link } from 'react-router-dom';
import './SignIn_SignUp.css';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'


export default function SignIn() {

  const { userLoggedIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithEmailAndPassword(email, password)
      // doSendEmailVerification()
    }
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      doSignInWithGoogle().catch(err => {
        setIsSigningIn(false)
      })
    }
  }

  return (
    <div className='signup-signin-container'>
      {userLoggedIn && history.push('/home', true)}
      <button onClick={() => history.push('/login')}>Login</button>

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
