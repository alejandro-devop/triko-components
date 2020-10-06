import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cartColor from 'assets/icons/car-color.png';
import CardIcon from '../card-icon';
import Text from 'components/base/text';
import ServiceInfo from './ServiceInfo';
import ConfirmIcon from '../ConfirmIcon';
import {
  STATUS_ACCEPTED,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_STARTED,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import Icon from 'components/base/icon';
import moment from 'moment';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const TaskCard = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const {
    transition,
    shortDescription = 'Armar arbol de navidad',
    application_date,
  } = request;
  const workflow = transition ? transition.workflow : '';
  const {_t} = useTranslation();
  const date = (application_date ? moment(application_date) : moment()).format(
    'MMM DD YYYY',
  );
  const time = (application_date ? moment(application_date) : moment()).format(
    'h:mm a',
  );

  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon image={cartColor} primary={_t('task_label').toUpperCase()} />
        {shortDescription && (
          <Text style={classes.shortDescription}>{shortDescription}</Text>
        )}
        {date && <Text style={classes.date}>{`${date} | ${time}`}</Text>}
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo request={request} />
        <View style={classes.label}>
          <Text style={classes.labelText}>{_t('waiting_for_candidates')}</Text>
          <Icon name="history" style={classes.icon} />
        </View>
      </View>
      {acceptedStatus.includes(workflow) && <ConfirmIcon />}
    </View>
  );
};

const styles = ({palette}) => ({
  date: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  icon: {
    color: palette.blue,
  },
  label: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    top: 5,
  },
  labelText: {
    fontSize: 16,
    marginRight: 10,
  },
  root: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  noTrikosLabel: {
    textAlign: 'center',
    color: palette.gray,
  },
  noTrikosLabelWrapper: {},
  serviceWrapper: {
    flex: 4,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
  shortDescription: {
    fontSize: 14,
    color: palette.gray,
  },
});

export default TaskCard;
