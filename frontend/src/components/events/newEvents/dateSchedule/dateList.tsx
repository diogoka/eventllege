import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}

const today = dayjs();

export default function DateList() {
  const [dates, setDates] = React.useState<DateRange[]>([{ dateStart: today, dateEnd: today }]);

  const deleteDateHandler = (index: number) => {
    const updatedDate = dates.filter((date, i) => {
      return i !== index;
    });
    setDates(updatedDate);
  };

  const addDateHandler = () => {
    setDates([...dates, { dateStart: today, dateEnd: today }]);
  };

  const updateDateHandler = (index: number, newDateStart: dayjs.Dayjs, newDateEnd: dayjs.Dayjs) => {
    const updatedDates = [...dates];
    updatedDates[index] = { dateStart: newDateStart, dateEnd: newDateEnd };
    setDates(updatedDates);
  };

  return (
    <>
      <Typography variant='h2'>Date</Typography>
      {dates.map((date, index) => (
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1} key={index}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={`Start Date ${index + 1}`}
                value={date.dateStart}
                onChange={(newDateStart) => {
                  newDateStart ? updateDateHandler(index, newDateStart, date.dateEnd) : null;
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={`End Date ${index + 1}`}
                value={date.dateEnd}
                onChange={(newDateEnd) => {
                  newDateEnd ? updateDateHandler(index, date.dateStart, newDateEnd) : null;
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <IconButton onClick={addDateHandler}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => deleteDateHandler(index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Stack>
      ))}
    </>
  );
}
