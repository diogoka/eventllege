"use client"
import { useState } from "react"
import { Stack } from "@mui/material";
import axios from "axios";

export default function SignUpPage() {

  const postUser = () => {
    axios
      .post('http://localhost:3001/api/users', {
        id: id,
        type: 2, // Student
        email: email,
        name: name,
        postalCode: postalCode,
        phone: phone,
        avatar: "010101010110"  // dummy data
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res)
      })
  }

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <Stack width={1/3}>
      Sign Up Page
      <input type="email" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
      <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
      <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} />
      <input type="text" placeholder="postal code" onChange={(event) => setPostalCode(event.target.value)} />
      <input type="text" placeholder="phone" onChange={(event) => setPhone(event.target.value)} />
      <button onClick={postUser}>Sign Up</button>
    </Stack>
  )
}