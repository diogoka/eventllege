'use client'
import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography } from "@mui/material"
import axios from "axios"

export default function PastEvent() {
  
  type Event={
    capacity_event: number,
    category_event: string,
    date_event_end: string,
    date_event_start: string,
    description_event: string,
    id_event: number,
    id_owner: string,
    image_event: string,
    location_event: string,
    name_event: string,
    price_event: number
  }

  type Tag={
    id_event: number,
    name_tag: string
  }

  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  
  useEffect(() => {
    
    axios.get("http://localhost:3001/api/events/")
    .then((res) => {
      console.log("res",res.data)
      setEvents(res.data.events)
      setTags(res.data.tags)
  })
  },[])

  return (
    <>
    <Typography variant="h3">History</Typography>
    <Stack>
        {events.map((elm:Event, key:number)=>{

          const eventDay = new Date(elm.date_event_start)
          const today = new Date()

          const eventDaySum = 10000*eventDay.getFullYear()+100*eventDay.getMonth()+eventDay.getDate()
          const todaySum = 10000*today.getFullYear()+100*today.getMonth()+today.getDate()

          if(eventDaySum < todaySum){

          return (
            <div key={key} style={{border:"1px solid grey", margin:"5px"}}>
              <div><b>ID: </b>{elm.id_event}</div>
              <div><b>Name: </b>{elm.name_event}</div>
              <div><b>Description: </b>{elm.description_event}</div>
              <div><b>Start: </b>{elm.date_event_start}</div>
              <div><b>End: </b>{elm.date_event_end}</div>
              <div><b>Location: </b>{elm.location_event}</div>
              <div><b>Category: </b>{elm.category_event}</div>
              <div><b>Price: </b>{elm.price_event}</div>
              <div><b>Owner: </b>{elm.id_owner}</div>
              <div><b>Tags: </b>

                {tags.map((tag:Tag, key:number)=>{
                  return elm.id_event==tag.id_event? <span key={key}>{tag.name_tag},&nbsp;</span> : null;
                })}
              
              </div>
              
            </div>
          )}
        })}
    </Stack>
  </>
  )
}