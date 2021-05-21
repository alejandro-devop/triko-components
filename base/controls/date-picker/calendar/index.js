import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import DayItem from '../day-item';
import useLocales from 'shared/hooks/use-locales';
import {useStyles} from '@triko-app/hooks';
import IconButton from 'shared/components/base/buttons/icon-button';
import YearPicker from '../year-picker';
import MonthPicker from '../month-picker';
import daysMap from '../days-map';
import styles from './styles';

/**
 * this component renders a dialog with the days for the displaying month
 * @version 1.0.0
 * @param day
 * @param year
 * @param month
 * @param days
 * @param currentMonth
 * @param currentYear
 * @param yearsFrom
 * @param yearsTo
 * @param onSelectDay
 * @param onChangeYear
 * @param onChangeMonth
 * @param onSelectMonth
 * @param disablePast
 * @param today
 * @returns {*}
 * @constructor
 */
const Calendar = ({
  day,
  year,
  month,
  days,
  currentMonth,
  currentYear,
  yearsFrom = 70,
  yearsTo = 0,
  onSelectDay,
  onChangeYear,
  onChangeMonth,
  onSelectMonth,
  disablePast,
  today,
}) => {
  const {months, days: dayNames} = useLocales();
  const [blockWidth, setWidth] = useState(0);
  const [visibleYearEdit, setVisibleYearEdit] = useState(false);
  const [visibleMonthEdit, setVisibleMonthEdit] = useState(false);
  const currentDate = moment();
  const date = moment(`${year}-${month}-1`, 'YYYY-M-D');
  const dayOfWeek = date.format('ddd');
  const offsetDays = daysMap.findIndex((item) => item === dayOfWeek);
  const [classes] = useStyles(styles);
  const monthName = months[month - 1];
  const onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setWidth(Math.floor(layout.width / 7));
  };
  const toggleYearEdit = () => setVisibleYearEdit(!visibleYearEdit);
  const toggleMonthEdit = () => setVisibleMonthEdit(!visibleMonthEdit);

  const onSelectYear = (selectedYear) => {
    if (onChangeYear) {
      onChangeYear(selectedYear);
    }
    toggleYearEdit();
  };

  return (
    <>
      <View style={classes.root}>
        <TouchableOpacity style={classes.yearWrapper} onPress={toggleYearEdit}>
          <View style={classes.offset} />
          <View style={classes.textWrapper}>
            <Text style={classes.yearText}>{year}</Text>
          </View>
          <IconButton
            name="pen"
            onPress={toggleYearEdit}
            iconStyles={classes.icon}
          />
        </TouchableOpacity>
        <View style={classes.monthWrapper}>
          <IconButton
            disabled={disablePast && month <= currentMonth}
            name="chevron-left"
            onPress={() => onChangeMonth(true)}
          />
          <TouchableOpacity
            style={classes.monthTouch}
            onPress={toggleMonthEdit}>
            <Text style={classes.monthText}>{monthName}</Text>
          </TouchableOpacity>
          <IconButton name="chevron-right" onPress={onChangeMonth} />
        </View>
        <View style={classes.dayWrapper}>
          {dayNames.map((dayName) => (
            <View style={[classes.day, {width: blockWidth}]} key={dayName}>
              <Text variant="caption" style={classes.dayText}>
                {dayName.substring(0, 2)}
              </Text>
            </View>
          ))}
        </View>
        <View onLayout={onLayout} style={classes.daysWrapper}>
          {_.times(offsetDays, (key) => (
            <View style={[{width: blockWidth}]} key={`offset-day-${key}`} />
          ))}
          {_.times(days, (key) => {
            const currDay = key + 1;
            return (
              <DayItem
                onSelect={() => onSelectDay(currDay)}
                key={`${monthName}-${key}-${currDay}`}
                disabled={
                  disablePast && month <= currentMonth && currDay < today
                }
                day={currDay}
                size={blockWidth}
                selected={
                  month === currentMonth &&
                  year === currentYear &&
                  currDay === parseInt(day, 10)
                }
              />
            );
          })}
        </View>
      </View>
      {visibleYearEdit && (
        <YearPicker
          fromDate={currentYear + (disablePast ? 0 : -yearsFrom)}
          open={visibleYearEdit}
          onClose={toggleYearEdit}
          onSelect={onSelectYear}
          year={year}
          to={parseInt(currentDate.format('YYYY'), 10) + yearsTo}
        />
      )}
      {visibleMonthEdit && (
        <MonthPicker
          open={visibleMonthEdit}
          onClose={toggleMonthEdit}
          onSelect={(selectedMonth) => {
            onSelectMonth(selectedMonth);
            toggleMonthEdit();
          }}
          year={year}
          month={month}
        />
      )}
    </>
  );
};

Calendar.propTypes = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  days: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yearsFrom: PropTypes.number,
  yearsTo: PropTypes.number,
  onSelectDay: PropTypes.func,
  onChangeYear: PropTypes.func,
  onChangeMonth: PropTypes.func,
  onSelectMonth: PropTypes.func,
  disablePast: PropTypes.bool,
  today: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Calendar;
