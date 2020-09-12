import moment from 'moment';

export const getBlockInfo = (
  day,
  events,
  hourObj,
  inputFormat,
  maxChars = 12,
) => {
  const {date, hour} = hourObj;
  const itemPreDate = moment(`${date} ${hour}`, 'YYYY-MM-DD h:mm a');
  const itemDate = moment(
    itemPreDate.format(`YYYY-MM-${(day < 9 ? '0' : '') + day} HH:mm:ss`),
  ).format('x');
  let eventInfo = {};
  events.forEach(event => {
    const {begins, ends, type, title} = event;
    const beginDate = moment(begins, inputFormat);
    const endDate = moment(ends, inputFormat);
    const beginTimestamp = beginDate.format('x');
    const endTimestamp = endDate.format('x');
    const duration = moment.duration(endDate.diff(beginDate)).hours();
    if (
      (itemDate >= beginTimestamp && itemDate < endTimestamp) ||
      (itemDate < endTimestamp && itemDate > beginTimestamp)
    ) {
      eventInfo = {
        isOccupied: type === 'occupied',
        title:
          title.length > maxChars
            ? `${title.substring(0, maxChars)}...`
            : title,
        inRange: true,
        duration: duration || 1,
        firstBlock: duration > 1 && beginTimestamp === itemDate,
      };
    }
  });
  return eventInfo;
};
