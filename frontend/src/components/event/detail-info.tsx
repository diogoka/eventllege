import {
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import DetailInfoRow from './detail-info-row';
import { Attendee } from '@/app/events/[id]/page';
import AttendeesRow from './attendees/attendees-row';

type Props = {
  price: number;
  maxSpots: number;
  attendees: Attendee[];
  tags: string[];
  category: string;
}

export default function DetailInfo(props: Props) {

  return (
    <TableContainer>
      <Table
        size='small'
      >
        <TableBody
          sx={{
            borderWidth: '1px 0px',
            borderColor: '#33333333',
            borderStyle: 'solid'
          }}
        >
          <DetailInfoRow
            title='Price'
            content={props.price === 0 ? 'Free' : props.price.toString()}
          />
          <DetailInfoRow
            title='Max spots'
            content={props.maxSpots.toString()}
          />
          <DetailInfoRow
            title='Attendees'
            content={<AttendeesRow attendees={props.attendees} />}
          />
          <DetailInfoRow
            title='Tags'
            content={props.tags.join(', ')}
          />
          <DetailInfoRow
            title='Category'
            content={props.category}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}