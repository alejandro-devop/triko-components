import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import eventsMock from './events.mock';
import MonthView from './month-view';
import WeekView from './week-view';
import DayView from './day-view';
import Controls from './Controls';
import moment from 'moment';
import {useEventList} from './hooks';

const currentMonth = moment().startOf('month');
const currentWeek = moment().startOf('isoWeek');
const daysMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysInMonth = moment().daysInMonth();

/**
 * This component renders the triko calendar and it's different visualizations (Month, week, day)
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param inputFormat
 * @returns {*}
 * @constructor
 */
const MySchedule = ({inputFormat = 'YYYY-MM-DD HH:mm:ss'}) => {
  const [currentOption, setCurrentOption] = useState(0);
  const currentDay = parseInt(moment().format('D'), 10);
  const onSelectMonthDay = () => {};
  const onChangeOption = (key) => setCurrentOption(key);
  const {events = [], refresh} = useEventList();

  const getEvents = (day) => {
    return events.filter((item) => {
      const itemDate = moment(item.start, inputFormat);
      return day === parseInt(itemDate.format('D'), 10);
    });
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
      return () => {};
    }, []),
  );

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
          events={eventsMock.filter((item) => item.type !== 'occupied')}
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

MySchedule.propTypes = {
  inputFormat: PropTypes.string,
};

export default MySchedule;
