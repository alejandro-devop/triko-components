import React, {useState} from 'react';
import moment from 'moment';
import {Platform, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Label from 'shared/components/base/label';
import CircleButton from 'shared/components/base/buttons/circle-button';
import useStyles from 'shared/hooks/use-styles';
import Calendar from './Calendar';
import {formatNumber} from './commons';

const DialogControl = ({
  date,
  format = 'hh:mm:ss a',
  open,
  onClose,
  placeholder,
  disablePast,
  onSelectDate,
}) => {
  const [classes] = useStyles(styles);
  const currentDate = moment(date, format);
  const [monthDays, setMonthDays] = useState(currentDate.daysInMonth());
  const initialDate = {
    year: parseInt(currentDate.format('YYYY'), 10),
    month: parseInt(currentDate.format('M'), 10),
    day: parseInt(currentDate.format('D'), 10),
  };
  const [displayDate, setDisplayDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const onNextMonth = () => {};

  const onSelectDay = selectedDay => {
    setSelectedDate({...displayDate, day: selectedDay});
  };

  const updateDays = ({year, month, day}) => {
    const tmpDate = moment(
      `${formatNumber(year)}-${formatNumber(month)}-${formatNumber(day)}`,
    );
    setMonthDays(tmpDate.daysInMonth());
  };

  const onChangeYear = selectedYear => {
    const newPayload = {...displayDate, year: selectedYear};
    updateDays(newPayload);
    setDisplayDate(newPayload);
  };

  const onChangeMonth = substract => {
    onSelectMonth(displayDate.month + (substract ? -1 : 1));
  };

  const onSelectMonth = selectedMonth => {
    let month = selectedMonth;
    let year = displayDate.year;
    let day = displayDate.day;
    if (month > 12) {
      month = 1;
      year++;
    }
    if (month < 1) {
      month = 12;
      year--;
    }
    setDisplayDate({year, month, day});
    updateDays({year, month, day});
  };

  const onAccept = () => {
    const {year, month, day} = selectedDate;
    const dateObject = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
    if (onSelectDate) {
      onSelectDate(dateObject.toDate());
    }
    onClose();
  };

  const {month, year} = displayDate;
  const {day} = selectedDate;
  return (
    <Dialog contentStyles={classes.root} open={open} onClose={onClose}>
      <Label style={classes.label}>{placeholder}</Label>
      <Calendar
        day={day}
        year={year}
        month={month}
        currentMonth={selectedDate.month}
        currentYear={selectedDate.year}
        today={parseInt(currentDate.format('D'), 10)}
        days={monthDays}
        disablePast={disablePast}
        onChangeYear={onChangeYear}
        onChangeMonth={onChangeMonth}
        onSelectMonth={onSelectMonth}
        onNextMonth={onNextMonth}
        onSelectDay={onSelectDay}
      />
      <View style={classes.actionWrapper}>
        <CircleButton name="check" primary size="lg" onPress={onAccept} />
      </View>
    </Dialog>
  );
};

const styles = () => ({
  actionWrapper: {
    alignItems: 'center',
  },
  label: {
    fontSize: Platform.select({android: 20, ios: 22}),
  },
  root: {
    height: Platform.select({
      ios: 600,
      android: 600,
    }),
    maxHeight: '95%',
  },
});

export default DialogControl;
