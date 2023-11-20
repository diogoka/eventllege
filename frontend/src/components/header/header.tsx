'use client';
import Switcher from '../common/switcher';
import HeaderMB from './headerMB';
import HeaderPC from './headerPC';
import { AppBar } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

// interface Props {
//   sp: React.ReactElement;
//   pc: React.ReactElement;
//   initial?: 'sp' | 'pc' | 'none';
// }
export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(51, 3, 0, 0.1)',
      }}
    >
      <Switcher sp={<HeaderMB />} pc={<HeaderPC />} />
    </AppBar>
  );
}
