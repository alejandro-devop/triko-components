import React, {useState} from 'react';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import moment from 'moment';
import DialogControl from 'shared/components/base/controls/time-picker/DialogControl';
import {isEmpty} from 'shared/utils/functions';

/**
 * This component allows to create a time picker with modal
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param label
 * @param format
 * @param displayFormat
 * @param name
 * @param placeholder
 * @param onChange
 * @param value
 * @returns {*}
 * @constructor
 */
const TimePicker = ({
  label,
  format = 'hh:mm:ss a',
  displayFormat = 'h:mm a',
  name,
  placeholder,
  onChange,
  minDate,
  value = '',
  primary,
}) => {
  const [visible, setVisible] = useState(false);
  const date = value ? moment(value, format).toDate() : moment().toDate();
  const displayDate = value
    ? moment(value, displayFormat).format(displayFormat)
    : '';

  const toggleVisible = () => {
    setVisible(!visible);
  };
  const handleDateChange = newDate => {
    if (onChange) {
      const strDate = moment(newDate)
        .format(format)
        .toString();
      onChange({target: {name, value: strDate}});
    }
  };
  return (
    <>
      <TextField
        addOn={<IconButton onPress={toggleVisible} name="clock" />}
        placeholder={placeholder}
        onlyMask
        label={label}
        onPress={toggleVisible}
        value={displayDate || ''}
        primary={primary}
      />
      {visible && (
        <DialogControl
          open={visible}
          onClose={toggleVisible}
          placeholder={placeholder}
          date={isEmpty(value) ? minDate : value}
          onSelectDate={handleDateChange}
          format={format}
        />
      )}
    </>
  );
};

export default TimePicker;
