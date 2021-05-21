import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import RequestLocation from './RequestLocation';
import {useStyles} from '@triko-app/hooks';
import moment from 'moment';
import useRequestStatus from 'shared/hooks/use-request-status';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';
import ConfirmIcon from 'shared/components/requests-list/ConfirmIcon';
import classNames from 'shared/utils/classnames';

const ServiceInfo = ({
  alternative,
  isTriko,
  onViewMap,
  request = {},
  showDate,
  acceptedStatus = [],
  workflow,
  hideDistance,
  isPaid,
}) => {
  const {application_date, duration} = request;
  const requestDuration = parseInt(duration ? duration : 0, 10);
  const {_t} = useTranslation();
  const transition = request.transition ? request.transition.workflow : '';
  const status = useRequestStatus(transition, false, isPaid);
  const isUrgent = true;

  const date = (application_date ? moment(application_date) : moment()).format(
    'MMM DD',
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
          <Text style={classNames({title: true, titlePaid: isPaid}, classes)}>
            {status}
          </Text>
          {isUrgent && (
            <Text style={classNames({date: true, datePaid: isPaid}, classes)}>
              {_t('is_urgent')}
            </Text>
          )}
          {showDate && (
            <Text style={classNames({date: true, datePaid: isPaid}, classes)}>
              {formattedDate}
            </Text>
          )}
        </>
      )}
      {isTriko && (
        <View style={classes.infoWrapper}>
          <View>
            {showDate && (
              <Text
                style={classNames(
                  {date: true, datePaid: isPaid || alternative},
                  classes,
                )}>
                {formattedDate}
              </Text>
            )}
            {!hideDistance && (
              <RequestLocation
                alternative={alternative}
                hideMapButton={alternative}
                isPaid={isPaid}
                request={request}
                onViewMap={onViewMap}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ServiceInfo;
