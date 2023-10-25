"use client"
import { useState, useEffect, useContext } from "react"
import { Stack } from "@mui/material";
import axios from "axios";
import useUploadImage from "@/services/imageInput";
import { Select, MenuItem } from "@mui/material";
import { UserContext, User } from "@/context/userContext";

type Course = {
  id: number;
  name: string;
  category: string;
}

export default function UserPage() {

  const { user } = useContext(UserContext);

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

    if(!user) {
      return;
    }

    const formData = new FormData();
    formData.append("id", user.id);
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
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
  };

  return (
    <Stack width={1 / 3}>
      {isEditting ? (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <select value={user?.courseId} onChange={(e) => { setCourseId(Number(e.target.value)) }}>
          {courses.map((course: Course, index: number) => {
            return (
              <option key={index} value={course.id}>{course.name}</option>
            )
          })}
        </select>

          <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} required />
          <input type="text" placeholder="postal code(optional)" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
          <input type="text" placeholder="phone(optional)" value={phone} onChange={(event) => setPhone(event.target.value)} />
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