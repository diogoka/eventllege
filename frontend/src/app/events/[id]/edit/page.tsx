'use client';
import { useState, useEffect, useContext } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserContext } from '@/context/userContext';

const MAX_IMAGE_SIZE = 1024 * 1024 * 10; // 10MB

type Params = {
  params: {
    id: number;
  };
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

type Category = {
  category_course: string;
};

type Dates = {
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
};

export default function EditEventPage({ params }: Params) {
  console.log('edit', params.id);

  const router = useRouter();

  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState<Dates[]>([]);
  const [spots, setSpots] = useState(0);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState<File>();
  const [tagId, setTagId] = useState(1);
  const [category, setCategory] = useState('');

  //Tag data from server
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageSizeWarning, setImageSizeWarning] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/tags')
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/courses/category')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dates.some((date) => date.dateStart === null || date.dateEnd === null)) {
      console.log('Please select dates for all date');
      return;
    }

    if (!title || !description || !spots || !location || !price) {
      console.log('Please fill out all fields.');
      return;
    }

    const formData = new FormData();

    formData.append('owner', user!.id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('spots', spots.toString());
    formData.append('location', location);
    formData.append('price', price.toString());
    formData.append('tagId', tagId.toString());
    formData.append('category', category);

    if (dates.length > 0) {
      dates.forEach((date, index) => {
        formData.append(`dates[${index}][dateStart]`, date.dateStart?.toISOString() || '');
        formData.append(`dates[${index}][dateEnd]`, date.dateEnd?.toISOString() || '');
      });
    }

    if (picture) {
      formData.append('picture', picture);
    }

    axios
      .put(`http://localhost:3001/api/events/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log('axios', res.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      });

    router.push(`/events`);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length !== 1) return;
    const file: File = event.target.files[0];
    if (file.size < MAX_IMAGE_SIZE) {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 480,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setPicture(compressedFile);
      } catch (error) {
        console.log(error);
      }
    } else {
      setImageSizeWarning('Please upload an image that is 10MB or smaller.');
    }
  };

  const deleteDateHandles = (index: number) => {
    const updatedDate = dates.filter((date, i) => {
      return i !== index;
    });
    setDates(updatedDate);
  };

  return (
    <Stack>
      Edit Events Page
      <form onSubmit={submitHandler}>
        <input type='text' name='tittle' placeholder='tittle' onChange={(event) => setTitle(event.target.value)} />
        <textarea
          name='description'
          placeholder='description'
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input type='file' accept='image/*' onChange={handleImageUpload} />

        {dates.map((date, index) => (
          <div key={index}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={`Start Date ${index + 1}`}
                value={date.dateStart}
                onChange={(newDateStart) => {
                  const updatedDate = [...dates];
                  updatedDate[index] = {
                    dateStart: newDateStart,
                    dateEnd: date.dateEnd,
                  };
                  setDates(updatedDate);
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={`End Date ${index + 1}`}
                value={date.dateEnd}
                onChange={(newDateEnd) => {
                  const updatedDate = [...dates];
                  updatedDate[index] = {
                    dateStart: date.dateStart,
                    dateEnd: newDateEnd,
                  };
                  setDates(updatedDate);
                }}
              />
            </LocalizationProvider>
            <button type='button' onClick={() => deleteDateHandles(index)}>
              delete Date
            </button>
          </div>
        ))}
        <button type='button' onClick={() => setDates([...dates, { dateStart: null, dateEnd: null }])}>
          Add Date
        </button>
        <input type='number' placeholder='Max spots' onChange={(event) => setSpots(+event.target.value)} />
        <input type='text' placeholder='location' onChange={(event) => setLocation(event.target.value)} />
        <label htmlFor='price'>Price</label>
        <input type='number' id='price' onChange={(event) => setPrice(+event.target.value)} />

        <div>{imageSizeWarning}</div>

        <select
          onChange={(e) => {
            setTagId(Number(e.target.value));
          }}
        >
          {tags.map((tag: Tag, index: number) => {
            return (
              <option key={index} value={tag.id_tag}>
                {tag.name_tag}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((elm: Category, index: number) => {
            return <option key={index}>{elm.category_course}</option>;
          })}
        </select>

        <input type='submit' value='Submit' />
      </form>
    </Stack>
  );
}
