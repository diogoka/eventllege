'use client'
import { useState, useEffect, useContext, MouseEvent } from 'react'
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import axios from 'axios';
import useUploadImage from '@/services/imageInput';
import { UserContext } from '@/context/userContext';
import { BasicButton } from "@/components/common/button";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

type Course = {
  id: number;
  name: string;
  category: string;
}

export default function SignUpPage() {

  const router = useRouter();

  const { setUser, firebaseAccount } = useContext(UserContext);

  // User Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Course data from server
  const [courses, setCourses] = useState([]);

  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

  // Get course data from server to show course names
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/courses')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }, []);

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        // Do nothing
        // Firebase's user info will be stored by onAuthStateChanged in AutoProvider
      })
      .catch((error: any) => {
        console.error(error);
      })
  };

  const handleGoogleAuth = async () => {

    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then(() => {
        // Do nothing
        // Firebase's user info will be stored by onAuthStateChanged in AutoProvider
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  // Send user info to our server
  const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {

    if (!firebaseAccount) {
      console.error('No firebase account');
      return;
    }

    const formData = new FormData();
    formData.append('id', firebaseAccount.uid);
    formData.append('email', firebaseAccount.email!);
    formData.append('type', '2');
    formData.append('courseId', courseId.toString());
    formData.append('name', name);
    if (postalCode) formData.append('postalCode', postalCode);
    if (phone) formData.append('phone', phone);
    if (image) formData.append('avatar', image);

    axios
      .post('http://localhost:3001/api/users', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then((res) => {
        setUser(res.data);
        router.replace('/events');
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }

  return (
    <Stack width={1 / 3}>
      Sign Up Page

      {!firebaseAccount ? (
        <>
          <form style={{ display: 'flex', flexDirection: 'column' }}>

            {!firebaseAccount && (
              <>
                <input type='text' placeholder='email' onChange={(event) => setEmail(event.target.value)} required />
                <input type='password' placeholder='password' onChange={(event) => setPassword(event.target.value)} required />
              </>
            )}

            <BasicButton variant='contained' color='primary' width='200px' onClick={() => handleEmailAuth}>Next</BasicButton>
          </form>
          <BasicButton variant='outlined' color='primary' width='200px' onClick={handleGoogleAuth}>Sign up with Google</BasicButton>
        </>
      ) : (
        <form style={{ display: 'flex', flexDirection: 'column' }}>

          <input type='text' placeholder='name' onChange={(event) => setName(event.target.value)} required />

          <select onChange={(e) => { setCourseId(Number(e.target.value)) }}>
            {courses.map((course: Course, index: number) => {
              return (
                <option key={index} value={course.id}>{course.name}</option>
              )
            })}
          </select>

          <input type='text' placeholder='postal code(optional)' onChange={(event) => setPostalCode(event.target.value)} />
          <input type='text' placeholder='phone(optional)' onChange={(event) => setPhone(event.target.value)} />
          <input type='file' accept='image/*' onChange={onFileInputChange} />
          <div>{warning}</div>

          <BasicButton variant='contained' color='primary' width='100px' onClick={handleSignup}>Register</BasicButton>
        </form>

      )}
    </Stack>
  )
}