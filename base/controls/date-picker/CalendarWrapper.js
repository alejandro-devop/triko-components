import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dialog from 'shared/components/dialogs/dialog';
import Button from 'shared/components/base/buttons/button';
import styles from './styles';
import useTranslation from 'hooks/useTranslation';

/**
 * This component allows to render a the select list items
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param empty
 * @param title
 * @param open
 * @param onClose
 * @returns {*}
 * @constructor
 */
const CalendarWrapper = ({date, title, open, onClose, onSelect}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const {_t} = useTranslation();
  const handleDateChange = () => {
    onSelect(selectedDate);
    onClose();
  };
  return (
    <>
      {Platform.OS === 'ios' ? (
        <Dialog
          contentStyles={styles.contentStyles}
          open={open}
          onClose={onClose}
          title={title}>
          <DateTimePicker
            mode="date"
            onChange={(e, d) => setSelectedDate(d)}
            value={selectedDate}
          />
          <View style={styles.actionsWrapper}>
            <Button secondary onPress={onClose}>
              {_t('time_picker_cancel')}
            </Button>
            <Button primary onPress={handleDateChange}>
              {_t('time_picker_cancel')}
            </Button>
          </View>
        </Dialog>
      ) : (
        <DateTimePicker
          mode="date"
          onChange={(event, date) => {
            onClose();
            onSelect(date);
          }}
          value={date}
        />
      )}
    </>
  );
};

CalendarWrapper.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  title: PropTypes.string,
};

export default CalendarWrapper;
