'use client';
import { IconContext } from 'react-icons';
import * as IconLibrary from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';



interface Props  {
  iconName: string;
  size?: string;
  color?: string;
  onClick?: (event: React.MouseEvent) => void;
  isClickable: boolean;
}


function iconItem({iconName, size, color, onClick, isClickable}: Props) {
  
  const SelectedIcon = IconLibrary[iconName];
  if(!SelectedIcon) return null;

    const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    if (isClickable && onClick) {
      onClick(event);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <IconContext.Provider value={{ color: color, size: size || '1rem' }}>
        <SelectedIcon />
      </IconContext.Provider>
    </IconButton>
  )
}

export default iconItem;