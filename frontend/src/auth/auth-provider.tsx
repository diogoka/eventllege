'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname, redirect } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';
import Header from '@/components/header';
import { UserContext, FirebaseAccount } from '@/context/userContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, firebaseAccount, setFirebaseAccount } = useContext(UserContext);
  const [isUserStatusReady, setIsUserStatusReady] = useState(false);


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
            setIsUserStatusReady(true);

            router.replace('/events');
          })
          .catch((error: any) => {
            setIsUserStatusReady(true);
            setUser(null);
          })
      }
      // When the user logged out or doesn't have an account
      else {
        setIsUserStatusReady(true);
        setFirebaseAccount(null);
        setUser(null);
      }
    });
  }, []);


  type Permisson = {
    isAllowed: boolean;
    redirection: string;
  }
  const isAllowedPage = (): Permisson => {

    // Wait for user info is ready
    if (!isUserStatusReady) {
      return { isAllowed: false, redirection: '' };
    }

    // If user exists (which means this user is logged in)
    if (user) {

      // If this user is a student
      if (user.role === 'student') {

        // Give permission only to allowed pages
        if (!isStudentPage(pathname)) {
          return { isAllowed: false, redirection: '/events' };
        }
      }
    }
    // If this user is not logged in
    else {
      // If this user is in the process of sign-up, go to sign-up page
      if (firebaseAccount) {

        // Don't redirect from sign-up page
        if (pathname !== '/signup') {
          return { isAllowed: false, redirection: '/signup' };
        }
      }
      // If this user is neither logged in nor signed up
      else {

        // Give permission only to allowed pages
        if (!isLoggedOutUserPage(pathname)) {

          // Don't redirect from sign-up page
          if (pathname !== '/signup') {
            return { isAllowed: false, redirection: '/login' };
          }
        }
      }
    }
    return { isAllowed: true, redirection: '' };
  }


  // When the user switches the page, check the page restriction
  useEffect(() => {
    const result: Permisson = isAllowedPage();
    if (!result.isAllowed && result.redirection) {
      router.replace(result.redirection);
    }
  }, [pathname, firebaseAccount, user, isUserStatusReady])

  return (
    <>
      <Header />
      {(isAllowedPage().isAllowed) && (
        <>
          <Container sx={{paddingInline: '40px'}}>
            {children}
          </Container>
        </>
      )}
    </>
  )
}

const loggedOutUserPages = [
  /^\/$/,
  /^\/events$/,
  /^\/events\/\d+$/,
  /^\/signup$/,
  /^\/login$/,
];

const studentPages = [
  /^\/user$/,
  /^\/tickets$/,
  /^\/history$/,
];

function isLoggedOutUserPage(pathname: string): boolean {
  return loggedOutUserPages.some((loggedOutUserPage) => {
    return loggedOutUserPage.test(pathname);
  });
}

function isStudentPage(pathname: string): boolean {
  return studentPages.concat(loggedOutUserPages).some((studentPage) => {
    return studentPage.test(pathname);
  });
}