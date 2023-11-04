'use client';
import { Box, Button, Stack, Typography } from "@mui/material"
import { Event, Tag } from "@/app/events/page"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { AiFillClockCircle } from 'react-icons/ai';


type Props = {
    event: Event;
    tags: Tag[];
};


export default function eventItem({ event, tags }: Props) {

    const weekDay = new Date(event.date_event_start).toLocaleString('en-us', { weekday: 'long' });
    const startTime = new Date(event.date_event_start).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTime = new Date(event.date_event_end).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true });
    const monthAndDay = new Date(event.date_event_start).toLocaleString('en-us', { month: 'short', day: 'numeric' });

    return (

        <Card onClick={()=>console.log("clicked")}>

            <CardContent sx={{display: 'flex'}}>
                <Box>
                    <Typography sx={{fontSize: 16}}>
                        {event.name_event}
                    </Typography>
                    <Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <AiFillClockCircle style={{fontSize: 12}}/>
                            <Typography sx={{fontSize: 12}}>
                                {weekDay}, {monthAndDay}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{fontSize: 10}}>
                                {startTime} - {endTime}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography sx={{fontSize: 12}}>
                        {event.description_event.length > 50 ? `${event.description_event.slice(0, 50)}...` : event.description_event}
                    </Typography>
                </Box>

                <Box>

                    <CardMedia
                        component="img"
                        height="140"
                        // image={event.image_event}
                        src="https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg"
                        alt="Event Image"
                    />

                </Box>

            </CardContent>

        </Card>

    )
}
