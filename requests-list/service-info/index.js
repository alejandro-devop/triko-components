import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import RequestLocation from './RequestLocation';
import useStyles from 'shared/hooks/use-styles';
import moment from 'moment';
import useRequestStatus from 'shared/hooks/use-request-status';
import useTranslation from 'hooks/useTranslation';
import styles from './styles';
import ConfirmIcon from 'shared/components/requests-list/ConfirmIcon';

const ServiceInfo = ({
  isTriko,
  onViewMap,
  request = {},
  showDate,
  acceptedStatus = [],
  workflow,
}) => {
  const {application_date, duration} = request;
  const requestDuration = parseInt(duration ? duration : 0, 10);
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
  const endDate = moment(application_date)
    .add(requestDuration, 'hours')
    .format('H:mm a');
  const formattedDate =
    `${date} | ${time}` + (requestDuration > 0 ? ` - ${endDate}` : '');
  return (
    <View style={classes.root}>
      {!isTriko && (
        <>
          <Text style={classes.title}>{status}</Text>
          {isUrgent && <Text style={classes.date}>{_t('is_urgent')}</Text>}
          {showDate && <Text style={classes.date}>{formattedDate}</Text>}
        </>
      )}
      {isTriko && (
        <View style={classes.infoWrapper}>
          <View>
            {showDate && <Text style={classes.date}>{formattedDate}</Text>}
            <RequestLocation request={request} onViewMap={onViewMap} />
          </View>
          {acceptedStatus.includes(workflow) && <ConfirmIcon />}
        </View>
      )}
    </View>
  );
};

export default ServiceInfo;
