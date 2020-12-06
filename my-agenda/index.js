import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import MonthView from './month-view';
import WeekView from './week-view';
import DayView from './day-view';
import Controls from './Controls';
import moment from 'moment';
import {useEventList} from './hooks';
import useRequestList from 'shared/hooks/use-request-list';
import {LoadingCurtain} from 'components/base/dialogs';

const currentMonth = moment().startOf('month');
const currentWeek = moment().startOf('isoWeek');
const daysMap = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const daysInMonth = moment().daysInMonth();

const getTransformedServices = (requests = []) => {
  return requests.reduce((accumulator, currentItem) => {
    const {application_date, details = [], duration} = currentItem;
    const [serviceDetail = {}] = details;
    const hours = parseInt(duration, 10);
    const startDate = moment(application_date, 'YYYY-MM-DD HH:mm:ss');
    const endDate = moment(application_date, 'YYYY-MM-DD HH:mm:ss').add(
      hours,
      'hours',
    );
    const event = {
      type: 'request',
      title: serviceDetail.service.name,
      start: startDate.format('YYYY-MM-DD HH:00:00'),
      end: endDate.format('YYYY-MM-DD HH:00:00'),
      request: currentItem,
    };
    accumulator.push(event);
    return accumulator;
  }, []);
};

/**
 * This component renders the triko calendar and it's different visualizations (Month, week, day)
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param inputFormat
 * @returns {*}
 * @constructor
 */
const MySchedule = ({inputFormat = 'YYYY-MM-DD HH:mm:ss', isTriko}) => {
  const [currentOption, setCurrentOption] = useState(0);
  const currentDay = parseInt(moment().format('D'), 10);
  const {loading, getPendingRequests, requests = []} = useRequestList({
    allTypes: true,
    isTriko,
    onlyMyServices: true,
  });
  const {events: userEvents = []} = useEventList();
  const onSelectMonthDay = () => {};
  const onChangeOption = (key) => setCurrentOption(key);
  const events = [...getTransformedServices(requests), ...userEvents];

  const getEvents = (day, eventsToProcess = []) => {
    return eventsToProcess.filter((item) => {
      const itemDate = moment(item.start, inputFormat);
      return day === parseInt(itemDate.format('D'), 10);
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  useEffect(() => {
    getPendingRequests();
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Controls
            currentOption={currentOption}
            onChangeOption={onChangeOption}
          />
          {currentOption === 0 && (
            <MonthView
              currentDay={currentDay}
              currentMonth={currentMonth}
              daysMap={daysMap}
              daysInMonth={daysInMonth}
              inputFormat={inputFormat}
              getEvents={getEvents}
              onSelectMonthDay={onSelectMonthDay}
              events={events.filter((item) => item.type !== 'occupied')}
            />
          )}
          {currentOption === 1 && (
            <WeekView
              events={events}
              getEvents={getEvents}
              currentWeek={currentWeek}
              currentDay={currentDay}
            />
          )}
          {currentOption === 2 && (
            <DayView
              currentMonth={currentMonth}
              currentDay={currentDay}
              events={getEvents(currentDay, events)}
            />
          )}
        </>
      )}
      {loading && <LoadingCurtain disableModal />}
    </>
  );
};

MySchedule.propTypes = {
  inputFormat: PropTypes.string,
};

export default MySchedule;
