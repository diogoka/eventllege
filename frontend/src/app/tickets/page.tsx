'use client'
import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import axios from 'axios'

export default function Tickets() {
  
  type Event={
    id_attendee: number,
    id_user: string,
    id_event: number,
    id_owner: string,
    name_event: string,
    description_event: string,
    date_event_start: string,
    date_event_end: string,
    location_event: string,
    capacity_event: number,
    price_event: number,
    image_event: null,
    category_event: string,
    tags: Array<string>,
    attendees: Array<string>
  }

  const [events, setEvents] = useState<Array<Event>>([]);
  
  useEffect(() => {

    const SAMPLE_USER='A'
    
    axios.get('http://localhost:3001/api/events/user', {
      params: { id_user : SAMPLE_USER }
    })
    .then((res) => {
      setEvents(res.data.events)
    })
  },[])

  return (
    <>
    <Typography variant='h3'>Tickets:</Typography>
    <Stack>

        {events.map((elm:Event, key:number) => {

          return (
            <div key = {key} style = {{border:'1px solid grey', margin:'5px'}}>
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

                {elm.tags.map((tag:string, key:number) => {
                  return <span key = {key}>{tag},&nbsp;</span>
                })}
              
              </div>
              <div><b>Attendees: </b>

                {elm.attendees.map((attendee:string, key:number) => {
                  return <span key = {key}>{attendee},&nbsp;</span>
                })}
              
              </div>
              
            </div>
          )
        })}
    </Stack>
  </>
  )
}