"use client";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

const MAX_IMAGE_SIZE = 1024 * 1024 * 10; // 10MB

type Id = {
  id: number;
};

type Tag = {
  id_tag: number;
  name_tag: string;
};

type Category = {
  category_course: string;
};

export default function EditEventPage(id: Id) {
  console.log("edit", id);

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("2023-11-15T08:00:00.000Z");
  const [dateEnd, setDateEnd] = useState("2023-11-16T08:00:00.000Z");
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

    console.log("here", formData);

    axios
      .put(`http://localhost:3001/api/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("axios", res.data);
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
      setImageSizeWarning("Please upload an image that is 10MB or smaller.");
    }
  };
  return (
    <Stack>
      Edit Events Page
      <form onSubmit={submitHandler}>
        <input type="text" name="tittle" placeholder="tittle" onChange={(event) => setTitle(event.target.value)} />
        <textarea
          name="description"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <input
          type="checkbox"
          name="date"
          id="dateStart"
          value={"2023-11-15T08:00:00.000Z"}
          onChange={(event) => setDateStart(event.target.value)}
        />
        <label htmlFor="dateStart">start date</label>

        <input
          type="checkbox"
          name="date"
          id="dateEnd"
          value={"2023-11-16T08:00:00.000Z"}
          onChange={(event) => setDateEnd(event.target.value)}
        />
        <label htmlFor="dateEnd">end date</label>
        <input type="number" placeholder="Max spots" onChange={(event) => setSpots(+event.target.value)} />
        <input type="text" placeholder="location" onChange={(event) => setLocation(event.target.value)} />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" onChange={(event) => setPrice(+event.target.value)} />

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
