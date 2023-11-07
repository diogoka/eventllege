'use client';
import { Box, Button, Stack, } from "@mui/material"
import IconItem from "@/components/icons/iconItem";

type Props = {
  icons: { name: string; isClickable: boolean, color: string }[];
  onIconClick: (iconName: string) => void;
}

export default function iconsContainer({icons, onIconClick}: Props) {

  const handleClick = (iconName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const icon = icons.find((icon) => icon.name === iconName);
    if(icon && icon.isClickable){
      onIconClick(iconName);
    }
  }

  return (
    <Stack direction="row" spacing={1} sx={{display: 'flex', alignItems:'center', justifyContent: 'space-evenly', marginTop: '0.5rem'}}>
      {
        icons.map((icon, index) => {
          return <IconItem iconName={icon.name} key={index} onClick={(event) => handleClick(icon.name, event)} isClickable={icon.isClickable} color={icon.color}/>;
        })
      }
    </Stack>    
  ) 
}
