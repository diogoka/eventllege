import dayjs from 'dayjs';
import { AlertColor } from '@mui/material';

export type Attendee = {
  id: string | undefined;
  name: string | undefined;
};

export type EventDate = {
  date_event_start: dayjs.Dayjs;
  date_event_end: dayjs.Dayjs;
};

export type Tag = {
  id_tag?: number;
  name_tag?: string;
  id_event?: number;
};

export type Event = {
  name_event: string;
  description_event: string;
  dates_event: Array<EventDate>;
  location_event: string;
  capacity_event: number;
  price_event: number;
  category_event: string;
  tags: Array<Tag>;
  image_url_event: string;
};

export type OtherInfo = {
  image_event: string;
  id_event: number;
  id_owner: string;
};

export interface AlertState {
  title: string;
  message: string;
  severity: AlertColor;
}
