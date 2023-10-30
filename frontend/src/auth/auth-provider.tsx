'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';

import { UserContext } from '@/context/userContext';

export default function AuthProvider() {
  const router = useRouter();

  const { setUser, setFirebaseAccount } = useContext(UserContext);

  useEffect(() => {

    initializeFirebase();

    // This handler is used for every change of login status
    // - Logout -> Sign up
    // - Logout -> Log in
    // - Log in -> Log out
    getAuth().onAuthStateChanged(async (firebaseAccount) => {

      console.log(firebaseAccount);

      if (firebaseAccount) {

        setFirebaseAccount(firebaseAccount);

        // Get user data from server
        axios
          .get(`http://localhost:3001/api/users/${firebaseAccount.uid}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.error(error);
            setUser(null);

            // If the user is signed up for Firebase but not signed up for our app,
            // Go to signup page and continue to fill out required fields
            router.replace('/signup');
          })
      }
      // When the user logged out or doesn't have an account
      else {
        setFirebaseAccount(null);
        setUser(null);
      }
    });
  }, []);


  return (
    <>
    </>
  )
}
