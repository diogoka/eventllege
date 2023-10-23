"use client"
import { useState, useEffect } from "react"
import { Stack } from "@mui/material";
import axios from "axios";

// For now, display info of the user whose ID is A
// Use ID of the logged-in user later
const SAMPLE_USER_ID = 'A';

type User = {
  id: string;
  role: string;
  name: string;
  email: string;
  postalCode: string;
  phone: string;
  // avatar: any;
}

export default function UserPage() {

  const [user, setUser] = useState<User>();

  // Get course data from server to show course names
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/${SAMPLE_USER_ID}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  }, []);

  // console.log(typeof user?.avatar);

  return (
    <Stack width={1 / 3}>
      <h1>User Page</h1>
      <div>{user?.id}</div>
      <div>{user?.name}</div>
      <div>{user?.role}</div>
      <div>{user?.email}</div>
      <div>{user?.postalCode}</div>
      <div>{user?.phone}</div>
      <img src={`http://localhost:3001/img/users/${user?.id}.png`} width={'30px'}/>
    </Stack>
  )
}