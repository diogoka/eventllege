'use client'
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  InputLabel,
  Container,
  FormHelperText,
  Box
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getErrorMessage } from '@/auth/errors';
import { UserContext, LoginStatus } from '@/context/userContext';
import PasswordResetModal from '@/components/login/password-reset-modal';

export default function LoginPage() {

  const route = useRouter();

  const theme = useTheme();

  const { setUser, setFirebaseAccount, setLoginStatus } = useContext(UserContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Alart Message
  const [alartMessage, setAlartMessage] = useState('');

  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const getUserFromServer = (uid: string) => {
    axios
      .get(`http://localhost:3001/api/users/${uid}`)
      .then((res: any) => {
        setUser(res.data);
        setLoginStatus(LoginStatus.LoggedIn);
        route.replace('/events');
      })
      .catch((error: any) => {
        setUser(null);
        setLoginStatus(LoginStatus.SigningUp);
      })
  }

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((result) => {
        setFirebaseAccount(result.user);
        getUserFromServer(result.user.uid);
      })
      .catch((error) => {
        setAlartMessage(getErrorMessage(error.code));
      });
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then((result) => {
        setFirebaseAccount(result.user);
        getUserFromServer(result.user.uid);
      })
      .catch((error) => {
        setAlartMessage(getErrorMessage(error.code));
      })
  }



  return (
    <Stack>

      <Container sx={{ width: 'auto', margin: 'auto', paddingBlock: '2rem' }}>
        <Image
          src='/eventllege_logo.svg'
          width={170}
          height={108}
          alt='logo'
        />
      </Container>
      <Stack rowGap={'20px'}>
        <form onSubmit={handleEmailLogin}>
          <Stack rowGap={'20px'}>

            <Stack rowGap={'10px'}>
              <FormControl required>
                <TextField type='email' label='Email' onChange={(event) => setEmail(event.target.value)} required />
              </FormControl>
              <FormControl required>
                <TextField type='password' label='Password' onChange={(event) => setPassword(event.target.value)} required />
                <Typography color='error'>{alartMessage}</Typography>
                <Typography
                  onClick={() => {
                    setIsPasswordReset(true);
                  }}
                  color={theme.palette.info.main}
                  sx={{
                    textAlign: 'right',
                    cursor: 'pointer'
                  }}
                >
                  Forgot password?
                </Typography>
                <PasswordResetModal
                  isPasswordReset={isPasswordReset}
                  setIsPasswordReset={setIsPasswordReset}
                />
              </FormControl>
            </Stack>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              Log In
            </Button>

          </Stack>
        </form>

        <Typography align='center'>or</Typography>
        <Button
          variant='outlined'
          color='secondary'
          startIcon={<FcGoogle />}
          onClick={handleGoogleLogin}
          sx={{
            borderColor: theme.palette.secondary.light
          }}
        >
          Log in with Google
        </Button>

      </Stack>
    </Stack>
  )
}
