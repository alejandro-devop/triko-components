import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import TextField from 'shared/components/base/controls/text-field';
import useTranslation from 'hooks/useTranslation';
import {useStyles} from 'hooks/index';
import ToggleButton from 'shared/components/base/buttons/toggle-button';
import styles from './styles';
import Label from 'shared/components/base/label';
import DatePicker from 'shared/components/base/controls/date-picker';
import TimePicker from 'shared/components/base/controls/time-picker';
import useForm from 'hooks/useForm';
import Button from 'shared/components/base/buttons/button';
import {oneIsEmpty} from 'utils/functions';

/**
 * This component renders and handle the event form
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onCancel
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const Form = ({onCancel, onSubmit}) => {
  const [classes] = useStyles(styles);
  const {form = {}, isValid, onChange} = useForm(
    {
      allDay: false,
      day: null,
      starts: null,
      ends: null,
    },
    {
      required: ['day', 'title'],
    },
  );
  const {allDay, starts, ends, day, title} = form;
  const {_t} = useTranslation();
  const disableSave = !isValid || (!allDay && oneIsEmpty([starts, ends]));
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(form);
    }
  };
  return (
    <ScrollView>
      <TextField
        label={_t('event_title_label')}
        primary
        placeholder={_t('event_title_placeholder')}
        name="title"
        onChange={onChange}
        value={title}
      />
      <View style={classes.toggleRow}>
        <Label>{_t('all_day_label')}</Label>
        <View style={classes.allDayWrapper}>
          <ToggleButton
            onPress={() => onChange({target: {name: 'allDay', value: !allDay}})}
            initialState={allDay}
            onIcon={false}
            onLabel={false}
          />
        </View>
      </View>
      <DatePicker
        primary
        name="day"
        value={day}
        onChange={onChange}
        placeholder={_t('event_start_day_label')}
      />
      <View style={classes.timeRow}>
        <View style={[classes.timeRowItem, classes.timeRowItemFirst]}>
          <TimePicker
            disabled={allDay}
            primary
            placeholder={_t('event_start_time')}
            name="starts"
            value={starts}
            onChange={onChange}
          />
        </View>
        <View style={[classes.timeRowItem, classes.timeRowItemLast]}>
          <TimePicker
            disabled={allDay}
            primary
            placeholder={_t('event_end_time')}
            name="ends"
            value={ends}
            onChange={onChange}
          />
        </View>
      </View>
      <View style={classes.actions}>
        <Button onPress={handleSubmit} disabled={disableSave} primary>
          {_t('save_text')}
        </Button>
        <Button secondary onPress={onCancel}>
          {_t('cancel_text')}
        </Button>
      </View>
    </ScrollView>
  );
};

Form.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form;
