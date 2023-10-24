"use client"
import { useState, useEffect } from "react"
import { Stack } from "@mui/material";
import axios from "axios";
import useUploadImage from "@/services/imageInput";
import { Select, MenuItem } from "@mui/material";

// For now, display info of the user whose ID is A
// Use ID of the logged-in user later
const SAMPLE_USER_ID = 'A';

type User = {
  id: string;
  role: string;
  courseId: number;
  courseName: string;
  name: string;
  email: string;
  postalCode: string;
  phone: string;
}

type Course = {
  id: number;
  name: string;
  category: string;
}


export default function UserPage() {

  const [user, setUser] = useState<User>();
  const [userInEdit, setUserInEdit] = useState<User>();
  const [isEditting, setIsEditing] = useState(false);

  // User Input
  const [courseId, setCourseId] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

  // Course data from server
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCourseId(user.courseId);
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

    const formData = new FormData();
    formData.append("id", SAMPLE_USER_ID);
    formData.append("type", "2");
    formData.append("courseId", courseId.toString());
    formData.append("email", email);
    formData.append("name", name);
    if (postalCode) formData.append("postalCode", postalCode);
    if (phone) formData.append("phone", phone);
    if (image) formData.append("avatar", image);

    axios
      .put('http://localhost:3001/api/users', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  };

  return (
    <Stack width={1 / 3}>
      {isEditting ? (
        <form onSubmit={handleSubmit}>
          <Select
            value={courseId}
            label="Course"
            onChange={(e) => { setCourseId(Number(e.target.value)) }}
          >
            {courses.map((course: Course, index: number) => {
              return (
                <MenuItem key={index} value={course.id}>{course.name}</MenuItem>
              )
            })}
          </Select>

          <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="text" placeholder="postal code" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
          <input type="text" placeholder="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          <input type="file" accept="image/*" onChange={onFileInputChange} />
          <div>{warning}</div>

          <input type="submit" value="OK" />
        </form>
      ) : (
        <>
          <h1>User Page</h1>
          <div>{user?.id}</div>
          <div>{user?.name}</div>
          <div>{user?.role}</div>
          <div>{user?.email}</div>
          <div>{user?.courseName}</div>
          <div>{user?.postalCode}</div>
          <div>{user?.phone}</div>
          <img src={`http://localhost:3001/img/users/${user?.id}`} width={'30px'} />

          <button style={{ width: 50 }} onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </Stack>
  )
}