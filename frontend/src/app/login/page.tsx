'use client'
import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then((error) => {
      console.log(error);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='email' onChange={(event) => setEmail(event.target.value)} />
        <input type='text' placeholder='password' onChange={(event) => setPassword(event.target.value)} />

        <input type='submit' value='Login' />
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </>
  )
}
