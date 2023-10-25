'use client'
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import initializeFirebase from '@/auth/firebase';
import { UserContext, User } from '@/context/userContext';

const dummyUser: User = {
  id: 'aaa',
  role: 'user',
  courseId: 2,
  courseName: 'Web',
  name: 'CCC',
  email: 'hahahaha@gmail.com',
  postalCode: 'TEKITO',
  phone: '4567876567'
}

export default function Header() {

  const router = useRouter();

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
        // setUser(dummyUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = async () => {
    signOut(getAuth())
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div style={{
      width: '100%',
      height: '3rem',
      borderBottom: '1px solid black',
      display: 'flex',
      columnGap: '1rem',
      padding: '.5rem',
    }}>
      {user ? (
        <div>You are logged in as {user.name}</div>
      ) : (
        <div>You are not logged in</div>
      )}
      <button onClick={() => router.push('/signup')}>Signup</button>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}