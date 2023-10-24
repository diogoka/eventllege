'use client'
import React from 'react'
import initializeFirebase from '@/auth/firebase';
import { getAuth } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import axios from 'axios';

export default function Header() {

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    initializeFirebase();
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        // Get user data from server
        axios
          .get(`http://localhost:3001/api/users/${user.uid}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.error(error.response.data);
            setUser(null);
          })
      } else {
        setUser(null);
      }
    });
  }, []);

  console.log(user);

  return (
    <div style={{
      width: '100%',
      height: '3rem',
      borderBottom: '1px solid black'
    }}>
      This is header
    </div>
  )
}
