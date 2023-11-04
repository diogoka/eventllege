'use client';
import { useEffect,useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import axios from 'axios'
import ModalRating from '@/components/modal'

export default function EventsPage() {
  type Event = {
    capacity_event: number;
    category_event: string;
    date_event_end: string;
    date_event_start: string;
    description_event: string;
    id_event: number;
    id_owner: string;
    image_event: string;
    location_event: string;
    name_event: string;
    price_event: number;
  };

  type Tag = {
    id_event: number;
    name_tag: string;
  };

  type Keyword = {
    andor: string,
    dateFrom: string,
    dateTo: string,
    text: string
  }

  const [events, setEvents] = useState<Array<Event>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);

  const [keyword, setKeyword] = useState<Keyword>({
    andor:'or',
    dateFrom: '',
    dateTo: '',
    text: ''
  });

  const [user, setUser] = useState({
    id_user: 'F',
    name: 'John',
    surname: 'Doe',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/events').then((res) => {
      setEvents(res.data.events);
      setTags(res.data.tags);
    });
  }, []);

  const newAttendee = (id_event: number) => {
    axios
      .post('http://localhost:3001/api/events/attendee', {
        id_event: id_event,
        id_user: user.id_user,
      })
      .then((res: any) => {
        console.log('res', res.data);
      });
  };

  const deleteAttendee = (id_event: number) => {
    axios
      .delete('http://localhost:3001/api/events/attendee', {
        data: {
          id_event: id_event,
          id_user: user.id_user,
        },
      })
      .then((res: any) => {
        console.log('res', res.data);
      });
  };

  return (
    <>
      <input type='text' name='keyword' onChange={(e)=>setKeyword((val:any)=>({...val, text:e.target.value}))}/>&nbsp;
      <input type='radio' name='andor' value='or' defaultChecked onChange={(e)=>setKeyword((val:any)=>({...val, andor:e.target.value}))}/><label>or</label>    
      <input type='radio' name='andor' value='and' onChange={(e)=>setKeyword((val:any)=>({...val, andor:e.target.value}))}/><label>and</label>&nbsp;
      <label>From:<input type='date' name='from' onChange={(e)=>setKeyword((val:any)=>({...val, dateFrom:e.target.value}))}/></label>&nbsp;
      <label>To:<input type='date' name='to' onChange={(e)=>setKeyword((val:any)=>({...val, dateTo:e.target.value}))}/></label>&nbsp;
      <input type='submit' value='search' onClick={()=>{
              
              axios.get('http://localhost:3001/api/events', {
                params: keyword
              }).then((res) => {
                setEvents(res.data.events);
                setTags(res.data.tags);
              });

      }}/>

      <Typography variant='h3'>Events Page</Typography>
      <Stack>
        {events.map((elm: Event, key: number) => {
          return (
            <div key={key} style={{ border: '1px solid grey', margin: '5px' }}>
              <div>
                <b>Name: </b>
                {elm.name_event}
              </div>
              <div>
                <b>Description: </b>
                {elm.description_event}
              </div>
              <div>
                <b>Start: </b>
                {elm.date_event_start}
              </div>
              <div>
                <b>End: </b>
                {elm.date_event_end}
              </div>
              <div>
                <b>Location: </b>
                {elm.location_event}
              </div>
              <div>
                <b>Category: </b>
                {elm.category_event}
              </div>
              <div>
                <b>Price: </b>
                {elm.price_event}
              </div>
              <div>
                <b>ID: </b>
                {elm.id_event}
              </div>
              <div>
                <b>Owner: </b>
                {elm.id_owner}
              </div>
              <div>
                <b>Tags: </b>

                {tags.map((tag: Tag, key: number) => {
                  return elm.id_event == tag.id_event ? <span key={key}>{tag.name_tag},&nbsp;</span> : null;
                })}
              </div>
              <button onClick={() => newAttendee(elm['id_event'])}>New Attendee</button>
              <button onClick={() => deleteAttendee(elm['id_event'])}>Delete Attendee</button>
              <ModalRating eventid = {elm['id_event']} userid = {user.id_user}/>
            </div>
          );
        })}
      </Stack>
    </>
  );
}
