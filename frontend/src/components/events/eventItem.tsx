'use client';
import { Box, ImageListItem, Typography } from '@mui/material'
import { Event, Tag } from '@/app/events/page'
import IconsContainer from '../icons/iconsContainer';
import { useRouter } from 'next/navigation';
import { AiFillClockCircle } from 'react-icons/ai';
import { useState, useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


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
    const textAreaRef = useRef(`http://localhost:3000/events/${id}`);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setIsAlertVisible(true);
                setTimeout(() => {
                    setIsAlertVisible(false);
                }, 3000);
            })
            .catch((err) => {
                console.error('Failed to copy URL: ', err);
            });
    };


    const onIconClickFunction = (iconName: string) => {
        if (iconName === 'FaShareSquare'){
            copyToClipboard(textAreaRef.current);
        }
    }

    const handleCardClick = () => {        
        router.push(`/events/${id}`);
    }

    const handleAlertClose = () => {
        setIsAlertVisible(false);
    };
    
    const BoxStyle = {
    display: 'grid',
    gridTemplateRows: '2.5rem 2.3rem 2rem',
    gridTemplateAreas: `
        "title picture"
        "date picture"
        "description icons"
    `,
    columnGap: '1rem',
    height: '7.5rem',
    alignContent: 'center',
    borderTop: '1px solid #E0E0E0',
    cursor: 'pointer',
    marginTop: '0',
    width: '100%'
    };

    const titleStyle = {
        fontSize: '1rem',
        gridArea: 'title',
        fontWeight: '500',
    }

    const dateContainerStyle = {
        gridArea : 'date',
    }

    const dayMonthStyle = {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    }

    const timeStyle = {
        fontSize: 11, 
        color:'#3874CB'
    }

    const descriptionStyle = {
        fontSize: 10,
        gridArea: 'description',
        textAlign:'justify'
    }

    const imageContainerStyle = {
        gridArea: 'picture',
        borderRadius: '5px',
        width: '6.25rem',
        height: '4.0625rem',
    }

    const imageStyle = {
        borderRadius: '5px',
        width: '6.25rem',
        height: '4.0625rem',
    }

    const iconContainerStyle = {
        gridArea: 'icons',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }

    return (

        <Box onClick={handleCardClick} sx={BoxStyle}>
            <Typography sx={titleStyle}>
                {event.name_event.length > 15 ? `${event.name_event.slice(0, 18)}...` : event.name_event}
                
            </Typography>
            <Box sx={dateContainerStyle}>  
                <Box sx={dayMonthStyle}>
                    <AiFillClockCircle style={{fontSize: 12}}/>
                    <Typography sx={{fontSize: 12}}>
                        {weekDay}, {monthAndDay}
                        </Typography>
                </Box>
                <Box>
                    <Typography sx={timeStyle}>
                        {startTime} - {endTime}
                    </Typography>
                </Box>
            </Box>

            <Typography sx={descriptionStyle}>
                {event.description_event.length > 50 ? `${event.description_event.slice(0, 50)}...` : event.description_event}
            </Typography>
            
                
            <ImageListItem key={event.name_event} sx={imageContainerStyle} >
                <img
                src={'https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg'}
                alt={event.name_event}
                loading="lazy"
                style={imageStyle}
            />
            </ImageListItem>
            <Box sx={iconContainerStyle}>
                 <IconsContainer icons={[
                    { name: 'FaCheckCircle', isClickable: false, color: '#333333' },
                    { name: 'FaShareSquare', isClickable: true, color: '#333333' },
                    ]} onIconClick={onIconClickFunction}
                    />
            </Box>
            {isAlertVisible && (
                <Alert
                    severity="success"
                    onClose={handleAlertClose}
                    sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: 9999 }}
                >
                    <AlertTitle>URL Copied</AlertTitle>
                    The event URL has been copied to your clipboard.
                </Alert>
            )}

        </Box>


    )
}
