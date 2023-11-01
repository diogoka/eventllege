import { ReactNode, MouseEvent } from 'react';
import { Button } from '@mui/material';

type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
type Variant = 'contained' | 'outlined' | 'text';

type Props = {
  variant: Variant;
  color: Color;
  width: number | string;
  icon?: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export function BasicButton(props: Props) {

  return (
    <Button
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
      startIcon={props.icon}
      sx={{
        width: props.width,
        height: '56px',
        borderRadius: '5px',
        textTransform: 'none',
      }}
      disableRipple
    >
      {props.children}
    </Button>
  )
}