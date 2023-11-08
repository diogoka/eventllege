'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { Stack, Typography, Button, Chip, Box } from '@mui/material';
import { UserContext } from '@/context/userContext';
import ImageHelper from '@/components/common/image-helper';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { IoIosSchool } from 'react-icons/io';
import UserInfoItem from '@/components/user/user-info-item';

const FALLBACK_IMAGE = '/default_avatar.svg';

export default function UserPage() {

  const router = useRouter();

  const { user } = useContext(UserContext);

  return (
    <Stack width='100%' paddingBlock='4rem'>

      <Stack alignItems='center' rowGap='1rem'>
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


        <UserInfoItem icon={<BsFillPersonFill />} value={user!.name} />
        <UserInfoItem icon={<HiMail />} value={user!.courseName} />
        <UserInfoItem icon={<IoIosSchool />} value={user!.name} />

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