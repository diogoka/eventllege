'use client'
import React, { useState } from 'react';
import Image from 'next/image';
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
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getErrorMessage } from '@/auth/errors';

export default function LoginPage() {

  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Alart Message
  const [alartMessage, setAlartMessage] = useState('');

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .catch((error) => {
        setAlartMessage(getErrorMessage(error.code));
      });
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .catch((error) => {
        setAlartMessage(getErrorMessage(error.code));
      })
  }

  return (
    <Stack>

      <Container sx={{width: 'auto', margin: 'auto', paddingBlock: '2rem'}}>
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
              </FormControl>
              <Typography color='error'>{alartMessage}</Typography>
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
