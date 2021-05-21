import React, {useState} from 'react';
import moment from 'moment';
import {Platform, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Label from 'shared/components/base/label';
import {useStyles} from '@triko-app/hooks';
import PickerControl from 'shared/components/base/controls/time-picker/PickerControl';
import CircleButton from 'shared/components/base/buttons/circle-button';
import Meridian from 'shared/components/base/controls/time-picker/Meridian';
import {formatNumber, snapTop} from './commons';

const DialogControl = ({
  date,
  format = 'hh:mm:ss a',
  open,
  onClose,
  onSelectDate,
  placeholder,
  step = 15,
}) => {
  const [classes] = useStyles(styles);
  const currentDate = moment(date, format);
  const m = snapTop(parseInt(currentDate.format('m'), 10), step);
  const [selectedDate, setSelectedDate] = useState({
    hours: parseInt(
      (m >= 60 ? currentDate.add(1, 'hour') : currentDate).format('h'),
      10,
    ),
    minutes: m >= 60 ? 0 : m,
    meridian: currentDate.format('a'),
  });

  const onChangeDate = (newDate) => {
    setSelectedDate({
      ...selectedDate,
      ...newDate,
    });
  };
  const {hours, minutes, meridian} = selectedDate;

  const handleAccept = () => {
    if (onSelectDate) {
      const formattedDate = `${hours}:${formatNumber(minutes)}:00 ${meridian}`;
      onSelectDate(moment(formattedDate, format).toDate());
    }
    onClose();
  };

  return (
    <Dialog contentStyles={classes.root} open={open} onClose={onClose}>
      <Label style={classes.label}>{placeholder}</Label>
      <View style={classes.wrapper}>
        <PickerControl
          max={13}
          min={1}
          value={hours}
          onChange={(h) => onChangeDate({hours: h})}
        />
        <PickerControl
          value={minutes}
          step={step}
          onChange={(m) => onChangeDate({minutes: m})}
        />
        <Meridian
          value={meridian}
          onChange={(m) => onChangeDate({meridian: m})}
        />
      </View>
      <View style={classes.actions}>
        <CircleButton name="check" primary onPress={handleAccept} />
      </View>
    </Dialog>
  );
};

const styles = () => ({
  actions: {
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: Platform.select({android: 20, ios: 22}),
  },
  root: {
    height: Platform.select({
      ios: 300,
      android: 300,
    }),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default DialogControl;
