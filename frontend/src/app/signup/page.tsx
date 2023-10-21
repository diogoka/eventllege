"use client"
import { useState } from "react"
import { Stack } from "@mui/material";
import axios from "axios";

export default function SignUpPage() {

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/api/users', {
        id: id,
        type: 2,
        email: email,
        name: name,
        postalCode: postalCode,
        phone: phone,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res.response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  };

  return (
    <Stack width={1 / 3}>
      Sign Up Page
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="id" onChange={(event) => setId(event.target.value)} />
        <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
        <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} />
        <input type="text" placeholder="postal code" onChange={(event) => setPostalCode(event.target.value)} />
        <input type="text" placeholder="phone" onChange={(event) => setPhone(event.target.value)} />

        <input type="submit" value="Register" />
      </form>
    </Stack>
  )
}