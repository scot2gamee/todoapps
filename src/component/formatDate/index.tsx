import moment from 'moment';

export const formattedDate = (dates: Date) => {
  const date = moment(dates).format('DD/MM/YYYY, HH:mm');
  return date;
};
