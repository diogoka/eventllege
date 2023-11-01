'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';
import Header from '@/components/header';

import { UserContext } from '@/context/userContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, firebaseAccount, setFirebaseAccount } = useContext(UserContext);

  useEffect(() => {

    // If user exists (which means this user is logged in), don't redirect
    if (user) {
      return;
    }
    // If this user is not logged in
    else {
      // If this user is in the process of sign-up, go to sign-up page
      if (firebaseAccount) {
        router.replace('/signup');
      }
      // If this user is neither logged in nor signed up
      else {
        // Give permission only to allowed pages
        if (isAllowedPage(pathname)) {
          return;
        }
        // Don't redirect from sign-up page
        else if (pathname === '/signup') {
          return;
        }
        // Otherwise, redirect to log-in page
        else {
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
          .then((res: any) => {
            setUser(res.data);
            router.replace('/events');
          })
          .catch((error: any) => {
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
      {(isAllowedPage(pathname) || user) && (
        <>
          <Container>
            {children}
          </Container>
        </>
      )}
    </>
  )
}

const allowedPages = [
  /^\/$/,
  /^\/events$/,
  /^\/events\/\d+$/,
  /^\/signup$/,
  /^\/login$/,
];

function isAllowedPage(pathname: string): boolean {

  return allowedPages.some((allowedPage) => {
    return allowedPage.test(pathname);
  });

}