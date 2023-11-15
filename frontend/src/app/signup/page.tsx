'use client'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  useTheme,
  Stack,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { LoginStatus, UserContext } from '@/context/userContext';
import { getErrorMessage } from '@/auth/errors';
import PasswordInput from '@/components/common/password-input';
import NameInput from '@/components/user/form/name-input';
import CourseInput from '@/components/user/form/course-input';

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

  const { setUser, firebaseAccount, setFirebaseAccount, loginStatus, setLoginStatus } = useContext(UserContext);

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
        .then((result) => {
          setFirebaseAccount(result.user);
          setLoginStatus(LoginStatus.SigningUp);
        })
        .catch((error: any) => {
          setAlartMessage(getErrorMessage(error.code));
        })
    } else {
      setAlartMessage('Password and Confirm Password doesn\'t match');
    }
  };

  const handleGoogleAuth = async () => {

    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then((result) => {
        setFirebaseAccount(result.user);
        setLoginStatus(LoginStatus.SigningUp);
      })
      .catch((error: any) => {
        setFirebaseAccount(null);
        setAlartMessage(getErrorMessage(error.code));
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
        setLoginStatus(LoginStatus.LoggedIn);
        router.replace('/events');
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }

  return (
    <Stack>
      <Typography variant='h1'>Sign Up</Typography>

      {/* Step1: Firebase Authentication */}
      {loginStatus === LoginStatus.LoggedOut && (
        <Stack rowGap={'20px'}>
          <form onSubmit={handleEmailAuth}>
            <Stack rowGap={'20px'}>

              <Stack rowGap={'10px'}>
                <FormControl required>
                  <TextField type='email' label='Email' onChange={(event) => setEmail(event.target.value)} required />
                </FormControl>
                <FormControl required>
                  <PasswordInput label='Password' setter={setPassword} />
                </FormControl>
                <FormControl required>
                  <PasswordInput label='Confirm Password' setter={setConfirmPassword} />
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
      )}

      {/* Step2: Register for our app */}
      {loginStatus === LoginStatus.SigningUp && (
        <form onSubmit={handleSignup}>
          <Stack rowGap={'20px'}>
            <Stack rowGap={'10px'}>

              <NameInput name={name} setName={setName} />
              <CourseInput courseId={courseId} setCourseId={setCourseId} />

              <Typography variant='body2' align='center'>
                If you are an instructor, please contact admin.
              </Typography>

            </Stack>
            <Button type='submit' variant='contained' color='primary' fullWidth>Register</Button>
          </Stack>
        </form>
      )}
    </Stack>
  )
}