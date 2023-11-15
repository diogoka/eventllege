'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { Stack, Button, Chip, Avatar } from '@mui/material';
import { UserContext } from '@/context/userContext';
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

        <Avatar
          src={`http://localhost:3001/img/users/${user?.id}?${new Date().getTime()}`}
          alt={user?.name}
          sx={{
            width: '7.5rem',
            height: '7.5rem',
            fontSize: '3rem'
          }}
        />

        {user?.roleName !== 'student' &&
          <Chip
            label={user?.roleName}
            variant='filled'
            color='error'
            sx={{
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          />
        }


        <UserInfoItem icon={<BsFillPersonFill />} value={user!.name} />
        <UserInfoItem icon={<HiMail />} value={user!.email} />
        <UserInfoItem icon={<IoIosSchool />} value={user!.courseName} />

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