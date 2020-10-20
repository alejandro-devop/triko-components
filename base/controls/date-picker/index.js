import React, {useState} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import DialogControl from './dialog-control';
import {isEmpty} from 'shared/utils/functions';

/**
 * This component allows to create a select box.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param disabled
 * @param error
 * @param label
 * @param name
 * @param placeholder
 * @param onChange
 * @param format
 * @param displayFormat
 * @param minDate
 * @param disablePast
 * @param value
 * @returns {*}
 * @constructor
 */
const DatePicker = ({
  disabled,
  error,
  label,
  format = 'YYYY-MM-DD',
  displayFormat = 'YYYY/M/D',
  name,
  placeholder,
  onChange,
  value = '',
  minDate,
  disablePast,
  ..._props
}) => {
  const [visible, setVisible] = useState(false);
  const date = value ? moment(value, format).toDate() : moment().toDate();
  const displayDate = value
    ? moment(value, displayFormat).format(displayFormat)
    : null;
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
        addOn={
          <IconButton
            disabled={disabled}
            onPress={toggleVisible}
            name="calendar"
          />
        }
        error={error}
        placeholder={placeholder}
        onlyMask
        label={label}
        onPress={toggleVisible}
        value={displayDate}
        disabled={disabled}
        {..._props}
      />
      {visible && (
        <DialogControl
          open={visible}
          onClose={toggleVisible}
          placeholder={placeholder}
          date={isEmpty(date) ? minDate : date}
          onSelectDate={handleDateChange}
          format={format}
          disablePast={disablePast}
        />
      )}
    </>
  );
};

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  displayFormat: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  format: PropTypes.string,
  label: PropTypes.string, // Label to be used for the input
  name: PropTypes.string, // Key to reference the input.
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  disablePast: PropTypes.bool,
};

export default DatePicker;
