"use client"
import { useState, useEffect } from "react"
import { Stack } from "@mui/material";
import axios from "axios";

type Course = {
  id: number;
  name: string;
  category: string;
}

export default function SignUpPage() {

  // User Input
  const [id, setId] = useState(generateUserId());
  const [courseId, setCourseId] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  // Course data from server
  const [courses, setCourses] = useState([]);

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

  // Send the user input to create an account
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/api/users', {
        id: id,
        type: 2,
        email: email,
        name: name,
        postalCode: postalCode,
        courseId: courseId,
        phone: phone,
      })
      .then((res) => {
        // console.log(res.data)
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  };

  return (
    <Stack width={1 / 3}>
      Sign Up Page
      <form onSubmit={handleSubmit}>

        <select onChange={(e) => {setCourseId(Number(e.target.value))}}>
          {courses.map((course: Course, index: number) => {
            return (
              <option key={index} value={course.id}>{course.name}</option>
            )
          })}
        </select>

        <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
        <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} />
        <input type="text" placeholder="postal code" onChange={(event) => setPostalCode(event.target.value)} />
        <input type="text" placeholder="phone" onChange={(event) => setPhone(event.target.value)} />

        <input type="submit" value="Register" />
      </form>
    </Stack>
  )
}

// Create random user ID until Firebase is done
function generateUserId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}