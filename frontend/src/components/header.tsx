'use client'
import React from 'react'
import initializeFirebase from '@/auth/firebase';
import { useEffect } from 'react';

export default function Header() {

  useEffect(() => {
    initializeFirebase();
  }, [])

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
