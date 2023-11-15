import React from 'react'
import { FormControl, TextField } from '@mui/material'

type Props = {
  name: string;
  setName: (name: string) => void;
}

export default function NameInput(props: Props) {
  return (
    <FormControl required fullWidth>
      <TextField
        type='text'
        label='Name'
        value={props.name}
        onChange={(event) => props.setName(event.target.value)}
        required
      />
    </FormControl>
  )
}
