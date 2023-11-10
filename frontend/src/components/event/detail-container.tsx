import { Box, Typography } from '@mui/material';
import ImageHelper from '@/components/common/image-helper';
import { FaLocationArrow } from 'react-icons/fa6';
import { AiFillClockCircle } from 'react-icons/ai';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { GrShare } from 'react-icons/gr';
import { getDayName, getMonthName, getTimeString } from '../../common/functions';
import { Event } from '../../app/events/[id]/page'

type Props ={
    event: Event
}

const DetailContainer =( {event}:Props )=> {

    const startDate = new Date(event?.date_event_start)
    const endDate = new Date(event?.date_event_end)

    const startDateDetail = `
    ${getDayName(startDate.getDay())}, 
    ${getMonthName(startDate.getMonth())} ${startDate.getDate()}, 
    ${startDate.getFullYear()}, ${getTimeString(startDate)}`


    const endDateDetail =
    startDate.getMonth()==endDate.getMonth() &&
    startDate.getDate()==endDate.getDate() &&
    startDate.getFullYear()==endDate.getFullYear()?
    
    `${getTimeString(endDate)}`
    :
    `${getDayName(endDate.getDay())}, 
    ${getMonthName(endDate.getMonth())} ${endDate.getDate()}, 
    ${endDate.getFullYear()}, ${getTimeString(endDate)}`

    return (
        <>
        
        <Typography variant='h1'>{event?.name_event}</Typography>

        <Box style={{ marginInline:'auto' }}>
            <ImageHelper
            src={`http://localhost:3001/img/events/${event?.id_event}`}
            width='100%'
            alt={event?.name_event}
            style={{ borderRadius:'10px', boxShadow:'0 0 4px 4px #77777777' }}
            />
        </Box>

        <Box display='flex' justifyContent='space-between'>
            <Box>
                <BsFillCheckSquareFill style={{ color:'green', fontSize: 12 }}/>&nbsp;Applied
            </Box>
            <Box>
                <BsHeart style={{ color:'purple', fontSize: 12 }}/>&nbsp;
                <GrShare style={{ fontSize: 12 }}/>
            </Box>
        </Box>

        <Box style={{ margin:'10px auto' }}>

            <Box display='flex'>
                <AiFillClockCircle style={{ fontSize: 12, marginTop:"5px" }}/>&nbsp;
                <Typography>{startDateDetail}&nbsp;-&nbsp;{endDateDetail}</Typography>
            </Box>
                
            <Box display='flex'>
                <FaLocationArrow style={{ color:'blue',fontSize: 12, marginTop:"5px" }}/>&nbsp;
                <Typography>{event?.location_event}</Typography>
            </Box>

        </Box>

        <Box>
            <Box style={{ fontWeight:'bold' }}>About this event:</Box>
            {event?.description_event}
        </Box>

        </>
    )
}

export default DetailContainer