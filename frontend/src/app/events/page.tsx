"use client";
import { useEffect,useState } from "react"
import { Container, Stack, Typography } from "@mui/material"
import axios from "axios"

export default function EventsPage() {

  const [events, setEvents]= useState([]);
  const [tags, setTags]= useState([]);

  const[user, setUser]= useState({
    id_user: "F",
    name: "John",
    surname: "Doe",
  });

  useEffect(() => {
    
    axios.get("http://localhost:3001/api/events")
    .then((res) => {
      console.log("res",res.data)
      setEvents(res.data.events)
      setTags(res.data.tags)
  })

  console.log("user",user)
  
},[])

const newAttendee = (id_event: number) => {
  axios.post("http://localhost:3001/api/events/attendee",{
    id_event: id_event,
    id_user: user.id_user
  })
  .then((res: any) => {
    console.log("res",res.data)
    
  }
  )
}

const deleteAttendee = (id_event: number) => {
  axios.delete("http://localhost:3001/api/events/attendee",{
    data: {
      id_event: id_event,
      id_user: user.id_user
    }  
  })
  .then((res: any) => {
    console.log("res",res.data)
    
  }
  )
}



  return (
    <>
      <Typography variant="h3">Events Page</Typography>
      <Stack>
          {events.map((elm, key)=>{
            return (<div key={key} style={{border:"1px solid grey", margin:"5px"}}>
              <div>Name: {elm["name_event"]}</div>
              <div>Start: {elm["date_event_start"]}</div>
              <div>Start: {elm["date_event_end"]}</div>
              <div>Location: {elm["location_event"]}</div>
              <div>Category: {elm["category_event"]}</div>
              <div>Price: {elm["price_event"]}</div>
              <div>ID: {elm["id_event"]}</div>
              <div>Owner: {elm["id_owner"]}</div>
              <div>Tags:&nbsp;

              {tags.map((tag, key)=>{
                return elm["id_event"]==tag["id_event"]? <span key={key}>{tag["name_tag"]},&nbsp;</span> : null;
              })}
              
              </div>
              <button onClick={() => newAttendee(elm["id_event"])}>New Attendee</button>
              <button onClick={() => deleteAttendee(elm["id_event"])}>Delete Attendee</button>
              
            </div>)
          })}
      </Stack>
    </>
  )
}