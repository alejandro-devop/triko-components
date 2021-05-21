import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import moment from 'moment';
import useRequestStatus from 'shared/hooks/use-request-status';
import useTranslation from 'shared/hooks/use-translate';

const ServiceInfo = ({request = {}, showDate}) => {
  const {application_date} = request;
  const {_t} = useTranslation();
  const transition = request.transition ? request.transition.workflow : '';
  const status = useRequestStatus(transition);
  const isUrgent = true;

  const date = (application_date ? moment(application_date) : moment()).format(
    'MMM DD YYYY',
  );
  const time = (application_date ? moment(application_date) : moment()).format(
    'H:mm a',
  );
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={classes.title}>{status}</Text>
      {isUrgent && <Text style={classes.date}>{_t('is_urgent')}</Text>}
      {showDate && (
        <Text style={classes.date}>
          {date} | {time}
        </Text>
      )}
    </View>
  );
};

const styles = () => ({
  date: {
    fontSize: 14,
    marginBottom: 20,
  },
  root: {
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '600',
  },
});

export default ServiceInfo;
