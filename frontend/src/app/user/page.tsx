'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { Stack, Typography, Button, Chip } from '@mui/material';
import { UserContext } from '@/context/userContext';
import ImageHelper from '@/components/common/image-helper';

const FALLBACK_IMAGE = '/default_avatar.svg';

export default function UserPage() {

  const router = useRouter();

  const { user } = useContext(UserContext);

  return (
    <Stack width='100%' paddingBlock='4rem'>

      <Stack alignItems='center' rowGap='.5rem'>
        <ImageHelper
          src={`http://localhost:3001/img/users/${user?.id}`}
          placeholderSrc={FALLBACK_IMAGE}
          width='7.5rem' height='7.5rem' style={{ borderRadius: '50%' }}
          alt='avatar'
        />

        {user?.role !== 'student' &&
          <Chip
            label={user?.role}
            variant='filled'
            color='error'
            sx={{
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          />
        }
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <Typography>{user?.courseName}</Typography>
        <Typography>{user?.postalCode}</Typography>
        <Typography>{user?.phone}</Typography>

        <Button
          variant='contained'
          sx={{ width: '7.5rem' }}
          onClick={() => router.push('/user/edit')}
        >
          Edit
        </Button>
      </Stack>
    </Stack>
  )
}