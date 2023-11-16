
export const getDayName = ( num:number ):string => {

  switch(num){
    
    case 0: return 'Sunday';

    case 1: return 'Monday';

    case 2: return 'Tuesday';

    case 3: return 'Wednesday';

    case 4: return 'Thursday';

    case 5: return 'Friday';

    default: return 'Saturday';

  }
}
  
export const getMonthName = ( num:number ):string => {

  switch(num){
    
    case 0: return 'January';

    case 1: return 'February';

    case 2: return 'March';

    case 3: return 'April';

    case 4: return 'May';

    case 5: return 'June';

    case 6: return 'July';

    case 7: return 'August';

    case 8: return 'September';

    case 9: return 'October';

    case 10: return 'November';

    default: return 'December';

  }
}
  
export const getTimeString = ( DateObj:any ):any => {

  return (
    DateObj.getHours() == 0?
    `12:${DateObj.getMinutes().toString().padStart(2, '0')} AM`:

    0 < DateObj.getHours() && DateObj.getHours() <= 11?
    `${DateObj.getHours()}:${DateObj.getMinutes().toString().padStart(2, '0')} AM`:

    DateObj.getHours() == 12?
    `12:${DateObj.getMinutes().toString().padStart(2, '0')} PM`:

    12 < DateObj.getHours() && DateObj.getHours() <= 23?
    `${DateObj.getHours()-12}:${DateObj.getMinutes().toString().padStart(2, '0')} PM`: null
  )
}