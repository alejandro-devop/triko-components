import moment from 'moment';
import _ from 'lodash';
const daysInMonth = moment().daysInMonth();

const occupiedEvents = [];
const dateObject = moment().startOf('month');

_.times(daysInMonth + 1, key => {
  occupiedEvents.push({
    type: 'occupied',
    title: 'Not available',
    begins: dateObject.format('YYYY-MM-DD 23:00:00'),
    ends: dateObject.format('YYYY-MM-DD 23:59:00'),
  });
  dateObject.add(1, 'days');
});

occupiedEvents.push({
  type: 'occupied',
  title: 'Not available',
  begins: dateObject.format('YYYY-MM-DD 23:00:00'),
  ends: moment(dateObject.format('YYYY-MM-DD HH:mm:ss'))
    .add(1, 'day')
    .format('YYYY-MM-DD 08:00:00'),
});

const getADate = (days = 0, time) => {
  const theDate = moment()
    .startOf('month')
    .add(days - 1, 'days');
  return theDate.format(`YYYY-MM-DD ${time}`);
};

export default [
  ...occupiedEvents,
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(1, '13:00:00'),
    ends: getADate(1, '14:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(1, '16:00:00'),
    ends: getADate(1, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(3, '16:00:00'),
    ends: getADate(3, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(4, '11:00:00'),
    ends: getADate(4, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(6, '11:00:00'),
    ends: getADate(6, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(7, '11:00:00'),
    ends: getADate(7, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(7, '14:00:00'),
    ends: getADate(7, '16:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(8, '11:00:00'),
    ends: getADate(8, '12:00:00'),
    request: {
      id: 1,
    },
  },

  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(9, '13:00:00'),
    ends: getADate(9, '14:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(9, '16:00:00'),
    ends: getADate(9, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(10, '16:00:00'),
    ends: getADate(10, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(10, '11:00:00'),
    ends: getADate(10, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(11, '11:00:00'),
    ends: getADate(11, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(12, '11:00:00'),
    ends: getADate(12, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Lavado y limpieza',
    begins: getADate(12, '1400:00'),
    ends: getADate(12, '17:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(13, '14:00:00'),
    ends: getADate(13, '16:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(14, '11:00:00'),
    ends: getADate(14, '12:00:00'),
    request: {
      id: 1,
    },
  },

  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(15, '13:00:00'),
    ends: getADate(15, '14:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(15, '16:00:00'),
    ends: getADate(15, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(16, '16:00:00'),
    ends: getADate(16, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(16, '11:00:00'),
    ends: getADate(16, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(17, '11:00:00'),
    ends: getADate(17, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(18, '11:00:00'),
    ends: getADate(18, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(19, '14:00:00'),
    ends: getADate(19, '16:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(19, '11:00:00'),
    ends: getADate(19, '12:00:00'),
    request: {
      id: 1,
    },
  },

  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(20, '13:00:00'),
    ends: getADate(20, '14:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(21, '16:00:00'),
    ends: getADate(21, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(22, '16:00:00'),
    ends: getADate(22, '18:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(23, '11:00:00'),
    ends: getADate(23, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(24, '11:00:00'),
    ends: getADate(24, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(25, '11:00:00'),
    ends: getADate(25, '12:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(26, '14:00:00'),
    ends: getADate(26, '16:00:00'),
    request: {
      id: 1,
    },
  },
  {
    type: 'request',
    title: 'Cuidado de niños',
    begins: getADate(27, '11:00:00'),
    ends: getADate(27, '12:00:00'),
    request: {
      id: 1,
    },
  },
];
