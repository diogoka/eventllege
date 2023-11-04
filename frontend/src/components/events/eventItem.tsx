'use client';
import { Box, Button, Icon, Stack, Typography } from "@mui/material"
import { Event, Tag } from "@/app/events/page"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconsContainer from "../icons/iconsContainer";
import { useRouter } from 'next/navigation';
import { AiFillClockCircle } from 'react-icons/ai';
import { useState } from "react";


type Props = {
    event: Event;
    tags: Tag[];
};


export default function eventItem({ event, tags }: Props) {

    const router = useRouter();
    const weekDay = new Date(event.date_event_start).toLocaleString('en-us', { weekday: 'long' });
    const startTime = new Date(event.date_event_start).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true });
    const endTime = new Date(event.date_event_end).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true });
    const monthAndDay = new Date(event.date_event_start).toLocaleString('en-us', { month: 'short', day: 'numeric' });
    const eventId = event?.id_event;
    const [id, setId] = useState(eventId);


    const onIconClickFunction = (iconName: string) => {
        console.log(iconName);
    }

    const handleCardClick = () => {
        
        console.log("stateID", id.toString());
        router.push(`/events/${id.toString()}`);
    }
    
    const cardStyle = {
    display: 'grid',
    gridTemplateRows: '2rem 2.3rem 2rem 2rem',
    gridTemplateAreas: `
        "title picture"
        "date picture"
        "description picture"
        "description icons"
    `,
    columnGap: '1rem'
    };


    return (

        <Card onClick={handleCardClick}>

            <CardContent style={cardStyle}>
           
                    <Typography sx={{fontSize: 18 ,gridArea: 'title'}}>
                        {event.name_event.length > 9 ? `${event.name_event.slice(0, 9)}...` : event.name_event}
                    </Typography>
                    <Box sx={{gridArea: 'date'}}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <AiFillClockCircle style={{fontSize: 12}}/>
                            <Typography sx={{fontSize: 12}}>
                                {weekDay}, {monthAndDay}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{fontSize: 11, color:'#3874CB'}}>
                                {startTime} - {endTime}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography sx={{fontSize: 10, textAlign:'justify', gridArea:'description'}}>
                        {event.description_event.length > 80 ? `${event.description_event.slice(0, 80)}...` : event.description_event}
                        
                    </Typography>
      

      

                    <CardMedia
                        component="img"
                        height="100rem"
                        width='100%'
                        // image={event.image_event}
                        src="https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg"
                        alt="Event Image"
                        sx={{gridArea: 'picture'}}
                        
                    />
                    <Box sx={{gridArea: 'icons'}}>
                        <IconsContainer icons={[
                            { name: "FaCheckCircle", isClickable: false },
                            { name: "FaShareSquare", isClickable: true },
                        ]} onIconClick={onIconClickFunction}
                        />
                    </Box>


            </CardContent>

        </Card>

    )
}
