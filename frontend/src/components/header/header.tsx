'use client';
import Switcher from '../common/switcher';
import HeaderMB from './headerMB';
import HeaderPC from './headerPC';
import { Box } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

// interface Props {
//   sp: React.ReactElement;
//   pc: React.ReactElement;
//   initial?: 'sp' | 'pc' | 'none';
// }
export default function Header() {
  return (
    <Box
      component={'header'}
      position="fixed"
      width="100%"
      bgcolor="white"
      zIndex={100}
      borderBottom={'1px solid rgba(51, 3, 0, 0.1)'}
    >
      <Switcher sp={<HeaderMB />} pc={<HeaderPC />} />
    </Box>
  );
}
