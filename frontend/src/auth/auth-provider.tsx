'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';
import Header from '@/components/header';
import { UserContext } from '@/context/userContext';

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

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, firebaseAccount, setFirebaseAccount } = useContext(UserContext);

  const [isFirebaseResponsed, setIsFirebaseResponsed] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {

    if (!isFirebaseResponsed) {
      return;
    }

    // If user exists (which means this user is logged in)
    if (user) {

      // If this user is a student
      if (user.role === 'student') {

        // Give permission only to allowed pages
        if (!isStudentPage(pathname)) {
          router.replace('/events');
        }
      }
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
        if (!isLoggedOutUserPage(pathname)) {

          // Don't redirect from sign-up page
          if (pathname !== '/signup') {
            router.replace('/login');
          }
        }
      }
    }

    setIsAllowed(true);

  }, [pathname, firebaseAccount, user, isFirebaseResponsed])

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
            console.log('responded true');
            setIsFirebaseResponsed(true);

            if (pathname === '/signup' || pathname === '/login') {
              router.replace('/events');
            }
          })
          .catch((error: any) => {
            console.log('responded false');

            setIsFirebaseResponsed(true);
            setUser(null);
          })
      }
      // When the user logged out or doesn't have an account
      else {
        setIsFirebaseResponsed(true);
        setFirebaseAccount(null);
        setUser(null);
      }
    });
  }, []);


  return (
    <>
      <Header />
      {(isAllowed) && (
        <>
          <Container>
            {children}
          </Container>
        </>
      )}
    </>
  )
}



function isLoggedOutUserPage(pathname: string): boolean {
  return loggedOutUserPages.some((loggedOutUserPage) => {
    return loggedOutUserPage.test(pathname);
  });
}

function isStudentPage(pathname: string): boolean {
  return studentPages.some((studentPage) => {
    return studentPage.test(pathname);
  });
}