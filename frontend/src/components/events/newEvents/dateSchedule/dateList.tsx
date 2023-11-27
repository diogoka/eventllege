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
  isMobile: boolean;
};

const today = dayjs();

export default function DateList({ dates, setDates, isMobile }: Props) {
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
          color='info'
        >
          Add Date
        </Button>
      </Stack>
      {dates.map((date, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            height: isMobile ? '10rem' : '6rem',
            position: 'relative',
          }}
        >
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            rowSpacing={1}
            columnSpacing={{ md: 2 }}
          >
            <Grid item sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disablePast
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
            <Grid item sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disablePast
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
          </Grid>
          <Button
            onClick={() => deleteDateHandler(index)}
            variant='text'
            startIcon={<RemoveCircleOutlineIcon />}
            sx={{
              position: 'absolute',
              right: '1rem',
              bottom: 0,
            }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </>
  );
}
