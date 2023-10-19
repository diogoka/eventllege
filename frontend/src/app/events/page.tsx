import { Container, Stack, Typography } from "@mui/material"

export default function EventsPage() {
  return (
    <>
      <Typography variant="h3">Events Page</Typography>
      <Stack>
        <Container sx={{
          width: 320,
          height: '5rem',
          border: '1px solid black',
        }}>
          <Typography align='center'>Event 1</Typography>
        </Container>
      </Stack>
    </>
  )
}