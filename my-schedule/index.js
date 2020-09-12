import React, {useState} from 'react';
import eventsMock from './events.mock';
import MonthView from './month-view';
import WeekView from './week-view';
import DayView from './day-view';
import Controls from './Controls';
import moment from 'moment';

const currentMonth = moment().startOf('month');
const currentWeek = moment().startOf('isoWeek');
const daysMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysInMonth = moment().daysInMonth();

const MySchedule = ({inputFormat = 'YYYY-MM-DD HH:mm:ss'}) => {
  const [currentOption, setCurrentOption] = useState(0);
  const [currentDay, setCurrentDay] = useState(
    parseInt(moment().format('D'), 10),
  );
  const onSelectMonthDay = () => {};
  const onChangeOption = key => setCurrentOption(key);

  const getEvents = (day, events = []) => {
    return events.filter(item => {
      const itemDate = moment(item.begins, inputFormat);
      return day === parseInt(itemDate.format('D'), 10);
    });
  };

  return (
    <>
      <Controls currentOption={currentOption} onChangeOption={onChangeOption} />
      {currentOption === 0 && (
        <MonthView
          currentDay={currentDay}
          currentMonth={currentMonth}
          daysMap={daysMap}
          daysInMonth={daysInMonth}
          inputFormat={inputFormat}
          getEvents={getEvents}
          onSelectMonthDay={onSelectMonthDay}
          events={eventsMock.filter(item => item.type !== 'occupied')}
        />
      )}
      {currentOption === 1 && (
        <WeekView
          events={eventsMock}
          getEvents={getEvents}
          currentWeek={currentWeek}
          currentDay={currentDay}
        />
      )}
      {currentOption === 2 && (
        <DayView
          currentMonth={currentMonth}
          currentDay={currentDay}
          events={getEvents(currentDay, eventsMock)}
        />
      )}
    </>
  );
};

export default MySchedule;
