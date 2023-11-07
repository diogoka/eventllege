'use client'
import { useState, useEffect, useContext } from 'react'
import { Stack, Typography, Button, Chip, FormControl, TextField, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import useUploadImage from '@/services/imageInput';
import { Select, MenuItem } from '@mui/material';
import { UserContext, User } from '@/context/userContext';
import ImageHelper from '@/components/common/image-helper';

const FALLBACK_IMAGE = '/default_avatar.svg';

type Course = {
  id: number;
  name: string;
  category: string;
}

export default function UserPage() {

  const { user } = useContext(UserContext);

  const [isEditting, setIsEditing] = useState(false);

  // User Input
  const [courseId, setCourseId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

  // Course data from server
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCourseId(user.courseId.toString());
      setPostalCode(user.postalCode);
      setPhone(user.phone);
    }
  }, [user]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('type', '2');
    formData.append('courseId', courseId.toString());
    formData.append('email', email);
    formData.append('name', name);
    if (postalCode) formData.append('postalCode', postalCode);
    if (phone) formData.append('phone', phone);
    if (image) formData.append('avatar', image);

    axios
      .put('http://localhost:3001/api/users', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then((res) => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  };

  return (
    <Stack width='100%' paddingBlock='4rem'>
      {isEditting ? (
        <form onSubmit={handleSubmit}>
          <Stack alignItems='center' rowGap='1rem'>
            <ImageHelper
              src={`http://localhost:3001/img/users/${user?.id}`}
              placeholderSrc={FALLBACK_IMAGE}
              width='7.5rem' height='7.5rem' style={{ borderRadius: '50%' }}
              alt='avatar'
            />
            <FormControl required fullWidth>
              <TextField type='text' label='Name' value={name} onChange={(event) => setName(event.target.value)} required />
            </FormControl>

            <FormControl required fullWidth>
              <InputLabel id='course'>Course</InputLabel>
              <Select id='course' label='Course' value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                {courses.map((course: Course, index: number) => {
                  return (
                    <MenuItem key={index} value={course.id}>{course.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <FormControl required fullWidth>
              <TextField type='email' label='Email' value={email} onChange={(event) => setEmail(event.target.value)} required />
            </FormControl>

            <div>{warning}</div>

            <Box width='100%' display='flex' justifyContent='space-between' columnGap='1.5rem'>
              <Button
                variant='outlined'
                color='error'
                sx={{flexGrow: 1}}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{flexGrow: 1}}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      ) : (
        <Stack alignItems='center' rowGap='.5rem'>
          <ImageHelper
            src={`http://localhost:3001/img/users/${user?.id}`}
            placeholderSrc={FALLBACK_IMAGE}
            width='7.5rem' height='7.5rem' style={{ borderRadius: '50%' }}
            alt='avatar'
          />

          <Chip
            label={user?.role}
            variant='filled'
            color='error'
            sx={{
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          />
          <Typography>{user?.name}</Typography>
          <Typography>{user?.email}</Typography>
          <Typography>{user?.courseName}</Typography>
          <Typography>{user?.postalCode}</Typography>
          <Typography>{user?.phone}</Typography>

          <Button
            variant='contained'
            sx={{ width: '7.5rem' }}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </Stack>
      )}
    </Stack>
  )
}