import { Box, Typography } from '@mui/material'

export default function Footer() {

  return (
    <Box component='footer' width='100vw' position='absolute' zIndex={200}  textAlign='center' sx={{
      transform: 'translateY(-100%)'
    }}>
      <Typography color='#666666' fontSize='.75rem' align='center'>
        ©️ 2023 Eventllege All Rights Reserved.
      </Typography>
    </Box>
  )
}