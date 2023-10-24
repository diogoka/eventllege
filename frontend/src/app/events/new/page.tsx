"use client";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
import imageCompression from "browser-image-compression";

const MAX_IMAGE_SIZE = 1024 * 1024 * 10; // 10MB

export default function NewEventPage() {
  //User Input
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2023-10-29T08:00:00.000Z");
  const [spots, setSpots] = useState(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState<File>();

  const [imageSizeWarning, setImageSizeWarning] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("owner", owner);
    // formData.append("tittle", tittle);
    // formData.append("description", description);
    // formData.append("date", date);
    // formData.append("spots", spots.toString());
    // formData.append("location", location);
    // formData.append("price", price.toString());
    // formData.append("image_event", picture!);

    const formData = {
      owner,
      title,
      description,
      date,
      spots,
      location,
      price,
      picture,
    };

    console.log("here", formData);

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
        <input type="text" placeholder="owner" onChange={(event) => setOwner(event.target.value)} />
        <input type="text" name="tittle" placeholder="tittle" onChange={(event) => setTitle(event.target.value)} />
        <textarea
          name="description"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input
          type="radio"
          name="date"
          value={"2023-10-29T08:00:00.000Z"}
          onChange={(event) => setDate(event.target.value)}
        />
        Once
        <input
          type="radio"
          name="date"
          value={"2023-10-31T08:00:00.000Z"}
          onChange={(event) => setDate(event.target.value)}
        />
        Multiple
        <input type="number" placeholder="Max spots" onChange={(event) => setSpots(+event.target.value)} />
        <input type="text" placeholder="location" onChange={(event) => setLocation(event.target.value)} />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" onChange={(event) => setPrice(+event.target.value)} />
        <div>{imageSizeWarning}</div>
        <input type="submit" value="Submit" />
      </form>
    </Stack>
  );
}
