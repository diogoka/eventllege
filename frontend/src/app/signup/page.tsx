'use client'
import { useState, useEffect, useContext, MouseEvent } from 'react'
import { useRouter } from 'next/navigation';
import { useTheme, Stack, TextField, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box, FormHelperText } from '@mui/material';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import useUploadImage from '@/services/imageInput';
import { UserContext } from '@/context/userContext';

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

  const theme = useTheme();

  const { setUser, firebaseAccount } = useContext(UserContext);

  // User Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Alart Message
  const [alartMessage, setAlartMessage] = useState('');

  // Course data from server
  const [courses, setCourses] = useState([]);

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

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          // Do nothing
          // Firebase's user info will be stored by onAuthStateChanged in AutoProvider
        })
        .catch((error: any) => {
          console.error(error);
        })
    } else {
      setAlartMessage('Password and Confirm Password doesn\'t match');
    }
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
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

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
    <Stack>
      <Typography variant='h1' align='center'>Sign Up</Typography>

      {!firebaseAccount ? (
        // Step1: Firebase Authentication
        <Stack rowGap={'30px'}>
          <form onSubmit={handleEmailAuth}>
            <Stack rowGap={'20px'}>

              <Stack rowGap={'10px'}>
                <FormControl required>
                  <TextField type='email' label='Email' onChange={(event) => setEmail(event.target.value)} required />
                </FormControl>
                <FormControl required>
                  <TextField type='password' label='Password' onChange={(event) => setPassword(event.target.value)} required />
                </FormControl>
                <FormControl required>
                  <TextField type='password' label='Confirm Password' onChange={(event) => setConfirmPassword(event.target.value)} required />
                </FormControl>
                <Typography color='error'>{alartMessage}</Typography>
              </Stack>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Next
              </Button>

            </Stack>
          </form>

          <Typography align='center'>or</Typography>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<FcGoogle />}
            onClick={handleGoogleAuth}
            sx={{
              borderColor: theme.palette.secondary.light
            }}
          >
            Sign up with Google
          </Button>

        </Stack>
      ) : (
        // Step2: Register for our app
        <form onSubmit={handleSignup}>
          <Stack rowGap={'20px'}>
            <Stack rowGap={'10px'}>

              <FormControl required>
                <TextField type='text' label='Name' onChange={(event) => setName(event.target.value)} required />
              </FormControl>

              <FormControl required>
                <InputLabel id='course'>Course</InputLabel>
                <Select id='course' label='Course' value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  {courses.map((course: Course, index: number) => {
                    return (
                      <MenuItem key={index} value={course.id}>{course.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>

            </Stack>
            <Button type='submit' variant='contained' color='primary' fullWidth>Register</Button>
          </Stack>

        </form>

      )}
    </Stack>
  )
}