import Link from 'next/link'
import { Stack, Typography, Button } from '@mui/material'

export default function NotFound() {
  return (
    <Stack alignItems='center' rowGap='2rem' paddingTop='6rem'>
      <Typography
        component='h1'
        lineHeight='4rem'
        marginBlock={0}
        fontSize={80}
        fontFamily='outfit'
      >
        404
      </Typography>
      <Typography>Sorry, the page you are looking for can’t be found</Typography>
      <Link href='/'>
        <Button variant='contained'
          sx={{
            paddingInline: '1.5rem'
          }}>
          Go Back to Home
        </Button>
      </Link>
      <img
        src='/404.png'
        width='100%'
        style={{
          maxWidth: '300px'
        }} />
    </Stack>
  )
}
