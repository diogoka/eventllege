"use client";
import { useEffect,useState } from "react"
import { Container, Stack, Typography } from "@mui/material"
import axios from "axios"

export default function EventsPage() {

  const [events, setEvents]= useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:3001/api/events")
    .then((res) => {
      console.log("res",res.data)
      setEvents(res.data)
  })
  
},[])

  return (
    <>
      <Typography variant="h3">Events Page</Typography>
      <Stack>
          {events.map(elm=>{
            return (<div style={{border:"1px solid grey", margin:"5px"}}>
              <div>Name: {elm["name_event"]}</div>
              <div>Start: {elm["date_event_start"]}</div>
              <div>Start: {elm["date_event_end"]}</div>
              <div>Location: {elm["location_event"]}</div>
              <div>Type: {elm["type_event"]}</div>
              <div>Price: {elm["price_event"]}</div>
              <div>ID: {elm["id_event"]}</div>
              <div>Owner: {elm["id_owner"]}</div>
            </div>)
          })}
      </Stack>
    </>
  )
}