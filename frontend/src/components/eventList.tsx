'use client';
import { Box, Button, Stack, Typography } from "@mui/material"
import { Event, Tag } from "@/app/events/page"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

type Props = {
  events: Event[];
  tags: Tag[];
};

function eventList({ events }: Props) {




  return (

    <Stack>
      {
        events.map((event) =>
          <Button sx={{ maxWidth: 335 }} onClick={() => console.log("clicked")}>
            <Card sx={{ maxWidth: 335 }}>
              <Box sx={{ display: 'flex' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.name_event}
                    </Typography>
                      {event.description_event.length > 50 ? `${event.description_event.slice(0, 50)}...` : event.description_event}
                    <Typography variant="body2" color="text.secondary">
                      {event.date_event_start}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image_event}
                      alt="event image"
                    />
                  </Box>

                </CardContent>
              </Box>
            </Card>
          </Button>
        )
      }
    </Stack>
  )

}


export default eventList