'use client'
import { useContext } from 'react';
import { UserContext, LoginStatus } from '@/context/userContext';
import {
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import DetailInfoRow from './detail-info-row';
import { Attendee, Tag } from '@/app/events/[id]/page';
import AttendeesRow from './attendees/attendees-row';

type Props = {
  price: number;
  maxSpots: number;
  attendees: Attendee[];
  tags: Tag[];
  category: string;
}

export default function DetailInfo(props: Props) {

  const { loginStatus } = useContext(UserContext);

  let tagsString="";

  props.tags.map((val:Tag, key:number)=>{
    tagsString+= key==0? `${val.name_tag}` : `, ${val.name_tag}`;
  })

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
          {loginStatus === LoginStatus.LoggedIn &&
            <DetailInfoRow
              title='Attendees'
              content={<AttendeesRow attendees={props.attendees} />}
            />
          }
          <DetailInfoRow
            title='Tags'
            content={ tagsString }
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