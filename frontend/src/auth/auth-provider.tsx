'use client';
import React, { use, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';
import Header from '@/components/common/header';
import { UserContext, LoginStatus } from '@/context/userContext';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, setFirebaseAccount, loginStatus, setLoginStatus } = useContext(UserContext);

  useEffect(() => {
    initializeFirebase();

    getAuth().onAuthStateChanged(async (firebaseAccount) => {
      // Use this handler only when user accesses to our page
      if (loginStatus !== LoginStatus.Unknown) {
        return;
      }

      if (firebaseAccount) {
        setFirebaseAccount(firebaseAccount);

        // Get user data from server
        axios
          .get(`http://localhost:3001/api/users/${firebaseAccount.uid}`)
          .then((res: any) => {
            setUser(res.data);
            setLoginStatus(LoginStatus.LoggedIn);
          })
          .catch((error: any) => {
            setUser(null);
            setLoginStatus(LoginStatus.SigningUp);
            router.replace('/signup');
          });
      }
      // When the user logged out or doesn't have an account
      else {
        setUser(null);
        setLoginStatus(LoginStatus.LoggedOut);
        if (!isLoggedOutUserPage(pathname)) {
          router.replace('/login');
        }
      }
    });
  }, []);

  type Permisson = {
    isAllowed: boolean;
    redirection: string;
  };
  const isAllowedPage = (): Permisson => {
    // Wait until the login status is confirmed
    if (loginStatus === LoginStatus.Unknown) {
      return { isAllowed: false, redirection: '' };
    }
    // If user is logged in
    else if (loginStatus === LoginStatus.LoggedIn) {
      // If this user is a student
      if (user) {
        if (user.role === 'student') {
          // Give permission only to allowed pages
          if (!isStudentPage(pathname)) {
            return { isAllowed: false, redirection: '/events' };
          }
        }
      } else {
        console.error("User is logged in but the data doesn't exist");
        return { isAllowed: false, redirection: '/events' };
      }
    }
    // If this user is not logged in
    else if (loginStatus === LoginStatus.LoggedOut) {
      // Give permission only to allowed pages
      if (!isLoggedOutUserPage(pathname)) {
        // Go to the login page, but don't redirect from sign-up page
        if (pathname !== '/signup' && pathname !== '/login') {
          return { isAllowed: false, redirection: '/login' };
        }
      }
    }
    // If this user is in the process of sign-up
    else if (loginStatus === LoginStatus.SigningUp) {
      // Go to the signup page, but don't redirect from sign-up page
      if (pathname !== '/signup') {
        return { isAllowed: false, redirection: '/signup' };
      }
    }

    return { isAllowed: true, redirection: '' };
  };

  // When the user switches the page, check the page restriction
  useEffect(() => {
    const result: Permisson = isAllowedPage();
    if (!result.isAllowed && result.redirection) {
      router.replace(result.redirection);
    }
  }, [pathname]);

  return (
    <>
      <Header />
      {isAllowedPage().isAllowed && <Container sx={{ paddingInline: '40px' }}>{children}</Container>}
    </>
  );
}

const loggedOutUserPages = [/^\/$/, /^\/events$/, /^\/events\/\d+$/, /^\/signup$/, /^\/login$/];

const studentPages = [/^\/user$/, /^\/user\/edit$/, /^\/tickets$/, /^\/history$/, /^\/user\/my-events$/];

const organizerPages = [
  /^\/organizer-events$/,
]

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
