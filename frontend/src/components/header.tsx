'use client'
import { useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { UserContext, User } from '@/context/userContext';

export default function Header() {



  const { user } = useContext(UserContext);

  const router = useRouter();

  const handleLogout = async () => {
    signOut(getAuth())
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div style={{
      width: '100%',
      height: 'auto',
      borderBottom: '1px solid black',
      display: 'flex',
      columnGap: '1rem',
      flexWrap: 'wrap',
      padding: '.5rem',
    }}>

      <button onClick={() => router.push('/')}>Home(Events)</button>
      <button onClick={() => router.push('/events/new')}>Create Event</button>
      <button onClick={() => router.push('/organizer-events')}>Organizer Events</button>
      <button onClick={() => router.push('/user')}>User</button>
      <button onClick={() => router.push('/signup')}>Signup</button>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {user ? (
        <div>You are logged in as {user.name}</div>
      ) : (
        <div>You are not logged in</div>
      )}
    </div>
  )
}