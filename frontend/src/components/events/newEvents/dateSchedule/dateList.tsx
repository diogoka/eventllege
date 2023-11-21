import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { Grid, Box, Stack, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface DateRange {
  dateStart: dayjs.Dayjs;
  dateEnd: dayjs.Dayjs;
}

type Props = {
  dates: DateRange[];
  setDates: (dates: DateRange[]) => void;
};

const today = dayjs();

export default function DateList({ dates, setDates }: Props) {
  const deleteDateHandler = (index: number) => {
    const updatedDate = dates.filter((date, i) => {
      return i !== index;
    });
    setDates(updatedDate);
  };

  const addDateHandler = () => {
    setDates([...dates, { dateStart: today, dateEnd: today }]);
  };

  const updateDateHandler = (
    index: number,
    newDateStart: dayjs.Dayjs,
    newDateEnd: dayjs.Dayjs
  ) => {
    const updatedDates = [...dates];
    updatedDates[index] = { dateStart: newDateStart, dateEnd: newDateEnd };
    setDates(updatedDates);
  };

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Typography variant='h2'>Date</Typography>
        <Button
          onClick={addDateHandler}
          startIcon={<AddCircleOutlineIcon />}
          size='medium'
          variant='text'
          sx={{ fontSize: '1rem' }}
        >
          Add Date
        </Button>
      </Stack>
      {dates.map((date, index) => (
        // <Stack
        //   direction="row"
        //   justifyContent="space-between"
        //   alignItems="center"
        //   spacing={1}
        //   key={index}
        // >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          rowSpacing={2}
          border={'1px solid rgba(51, 3, 0, 0.1)'}
          key={index}
        >
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={`Start Date ${index + 1}`}
                value={date.dateStart}
                onChange={(newDateStart) => {
                  newDateStart
                    ? updateDateHandler(index, newDateStart, date.dateEnd)
                    : null;
                }}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label={`End Date ${index + 1}`}
                value={date.dateEnd}
                onChange={(newDateEnd) => {
                  newDateEnd
                    ? updateDateHandler(index, date.dateStart, newDateEnd)
                    : null;
                }}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} sx={{ bgcolor: 'green' }}>
            <Button
              onClick={() => deleteDateHandler(index)}
              variant='text'
              startIcon={<RemoveCircleOutlineIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        // </Stack>
      ))}
    </>
  );
}
