"use client"
import { useState, useEffect, useContext } from "react"
import { Stack } from "@mui/material";
import axios from "axios";
import useUploadImage from "@/services/imageInput";
import { UserContext } from "@/context/userContext";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

type Course = {
  id: number;
  name: string;
  category: string;
}

export default function SignUpPage() {

  const { setUser, firebaseAccount } = useContext(UserContext);

  // User Input
  const [courseId, setCourseId] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Course data from server
  const [courses, setCourses] = useState([]);

  const { image, warning, onFileInputChange } = useUploadImage(10, 0.1, 480);

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

  // useEffect(() => {
  //   if(firebaseAccount) {
  //     if(firebaseAccount.email) setEmail(firebaseAccount.email);
  //     if(firebaseAccount.displayName) setName(firebaseAccount.displayName);
  //   }
  // }, [firebaseAccount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let reqUserId = '';
      let reqEmail = '';
      if(firebaseAccount) {
        reqUserId = firebaseAccount.uid;
        reqEmail = firebaseAccount.email!;
      } else {
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        reqUserId = userCredential.user.uid;
        reqEmail = userCredential.user.email!;
      }

      const formData = new FormData();
      formData.append("id", reqUserId);
      formData.append("type", "2");
      formData.append("courseId", courseId.toString());
      formData.append("email", reqEmail);
      formData.append("name", name);
      if (postalCode) formData.append("postalCode", postalCode);
      if (phone) formData.append("phone", phone);
      formData.append("avatar", image!);

      axios
        .post('http://localhost:3001/api/users', formData, {
          headers: { 'content-type': 'multipart/form-data' }
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error.response.data);
        })
    } catch (error: any) {
      console.error(error);
    }

  };

  const handleGoogleSignup = async () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Stack width={1 / 3}>
      Sign Up Page
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <select onChange={(e) => { setCourseId(Number(e.target.value)) }}>
          {courses.map((course: Course, index: number) => {
            return (
              <option key={index} value={course.id}>{course.name}</option>
            )
          })}
        </select>

        {!firebaseAccount && (
          <>
            <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} required />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} required />
          </>
        )}
        <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} required />
        <input type="text" placeholder="postal code(optional)" onChange={(event) => setPostalCode(event.target.value)} />
        <input type="text" placeholder="phone(optional)" onChange={(event) => setPhone(event.target.value)} />
        <input type="file" accept="image/*" onChange={onFileInputChange} />
        <div>{warning}</div>

        <input type="submit" value="Register" />
      </form>

      <button onClick={handleGoogleSignup}>Sign up with Google</button>
    </Stack>
  )
}