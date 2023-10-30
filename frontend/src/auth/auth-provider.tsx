'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';
import Header from '@/components/header';

import { UserContext } from '@/context/userContext';

const allowedPages = [
  /^\/signup$/,
  /^\/login$/,
  /^\/events$/,
  /^\/events\/\d+$/,
]

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, firebaseAccount, setFirebaseAccount } = useContext(UserContext);

  const isAllowed = allowedPages.some((allowedPage) => {
    return allowedPage.test(pathname);
  });

  useEffect(() => {
    if(!user) {
      // User is in the process of sign-up
      if(firebaseAccount) {
        router.replace('/signup');
      }
      // User is not logged in
      else {
        if(pathname !== '/signup') {
          router.replace('/login');
        }
      }
    }
  }, [pathname, firebaseAccount, user])

  useEffect(() => {

    initializeFirebase();

    // This handler is used for every change of login status
    // - Logout -> Sign up
    // - Logout -> Log in
    // - Log in -> Log out
    getAuth().onAuthStateChanged(async (firebaseAccount) => {

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
      <Header />
      {(isAllowed || user) && (
        <>
          <Container>
            {children}
          </Container>
        </>
      )}
    </>
  )
}
