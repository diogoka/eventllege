"use client";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MAX_IMAGE_SIZE = 1024 * 1024 * 10; // 10MB

type Tag = {
  id_tag: number;
  name_tag: string;
};

type Category = {
  category_course: string;
};

export default function NewEventPage() {
  //User Input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState<Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
  const [spots, setSpots] = useState(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState<File>();
  const [tagId, setTagId] = useState(1);
  const [category, setCategory] = useState("");

  //Tag data from server
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageSizeWarning, setImageSizeWarning] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tags")
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/courses/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      owner: "A",
      title,
      description,
      dateStart,
      dateEnd,
      spots,
      location,
      price,
      picture,
      tagId: tagId.toString(),
      category,
    };

    axios
      .post("http://localhost:3001/api/events/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("axios", res.data);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
    if (formData) {
      setTitle("");
      setDescription("");
      setSpots(0);
      setLocation("");
      setPrice(0);
    }
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
      setImageSizeWarning("Please upload an image that is 10MB or smaller.");
    }
  };
  return (
    <Stack>
      Create Events Page
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="tittle"
          placeholder="tittle"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          name="description"
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={dateStart} onChange={(newValue) => setDateStart(newValue)} />
          <DatePicker value={dateEnd} onChange={(newValue) => setDateEnd(newValue)} />
        </LocalizationProvider>
        <input
          type="number"
          placeholder="Max spots"
          value={spots}
          onChange={(event) => setSpots(+event.target.value)}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" value={price} onChange={(event) => setPrice(+event.target.value)} />

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

        <input type="submit" value="Submit" />
      </form>
    </Stack>
  );
}
