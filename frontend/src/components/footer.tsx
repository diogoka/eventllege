'use client'
import { useMediaQuery, Box, Typography } from '@mui/material'
import { usePathname } from 'next/navigation';

export default function Footer() {

  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();
  const isFooterRight = pathname === '/signup' && isMobile;

  return (
    <Box
      component='footer'
      width={isFooterRight ? '100vw' : '50%'}
      minWidth={isFooterRight ? 'auto' : '560px'}
      maxWidth={isFooterRight ? 'auto' : '960px'}
      position='absolute'
      right={0}
      zIndex={200}
      textAlign='center'
      sx={{
        transform: 'translateY(-100%)'
      }}>
      <Typography color='#666666' fontSize='.75rem' align='center'>
        ©️ 2023 Eventllege All Rights Reserved.
      </Typography>
    </Box>
  )
}