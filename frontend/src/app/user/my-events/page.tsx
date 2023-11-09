'use client'
import Box from '@mui/material/Box'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '@/context/userContext';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import EventList from '@/components/events/eventList';
import SearchBar from '@/components/searchBar';


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


type CurrentUser = {
    id: string;
    role: string;
}



function UserEvents() {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState<Array<Event>>([]);
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [alertOpen, setAlertOpen] = useState(false);

    const currentUser: CurrentUser = {
        id: user!.id,
        role: user!.role,
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/user/${currentUser.id}`).then((res) => {
            setEvents(res.data.events);
            setTags(res.data.tags);
        });
    }, []);

    const searchEvents = (text: string) => {
        axios.get(`http://localhost:3001/api/events/user/${currentUser.id}/?search=${text}`).then((res) => {
            setEvents(res.data.events);
            setTags(res.data.tags);
            if (res.data.events.length === 0) {
                setAlertOpen(true);
            }
        });
    }



    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {alertOpen && (
                <Alert
                    severity="info"
                    variant="filled"
                    onClose={() => setAlertOpen(false)}
                    sx={{ position: 'absolute', top: '10px', zIndex: 9999 }}
                >
                    No events found
                </Alert>
            )}
            <SearchBar searchEvents={searchEvents} />
            <EventList events={events} tags={tags} user={currentUser}></EventList>
        </Box>
    )
}

export default UserEvents