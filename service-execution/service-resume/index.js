import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import RowItem from '../commons/RowItem';
import styles from './styles';
import {useStyles, useSession} from 'hooks/index';
import currency from 'currency-formatter';
import moment from 'moment';
import {
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';
import Button from 'shared/components/base/buttons/button';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import {LoadingCurtain} from 'components/base/dialogs';

const ServiceResume = ({onTerminate, isTriko, request}) => {
  const [classes] = useStyles(styles);
  const {stack = {}} = useSession();
  const {sendRequest, loading} = useRequestUpdateAttrs(request);
  const {region} = stack;
  const {application_date, order = {}, history = [], duration = 0} = request;
  const startTransition = history.find(
    (item) => item.transition.workflow === STATUS_STARTED,
  );

  const endTransition = history.find((item) =>
    isTriko
      ? item.transition.workflow === STATUS_QUALIFY_CLIENT
      : item.transition.workflow === STATUS_QUALIFY_TRIKO,
  );
  const scheduledDate = moment(application_date, 'YYYY-MM-DD HH:mm:ss');
  const startDate = moment(startTransition.created_at, 'YYYY-MM-DD HH:mm:ss');
  const endDate = moment(endTransition.created_at, 'YYYY-MM-DD HH:mm:ss');
  const diffHours = endDate.diff(startDate, 'hours');
  const diffMinutes = endDate.diff(startDate, 'minutes') - diffHours * 60;
  const total = order ? order.total : 0;

  const handleTerminate = async () => {
    await sendRequest({
      attrs: isTriko ? {terminatedTriko: true} : {terminatedClient: true},
    });
    if (onTerminate) {
      onTerminate();
    }
  };

  return (
    <>
      <View style={classes.root}>
        <RowItem
          icon="calendar-day"
          title="resume_application_date"
          description={scheduledDate.format('D/M/YYYY h:mm a')}
        />
        <RowItem
          icon="calendar"
          title="resume_start_date"
          description={startDate.format('D/M/YYYY h:mm a')}
        />
        <RowItem
          icon="calendar-check"
          title="resume_end_date"
          description={endDate.format('D/M/YYYY h:mm a')}
        />
        <RowItem
          icon="clock"
          title="resume_duration_scheduled"
          description={`${duration} Hrs`}
        />
        <RowItem
          icon="clock"
          title="resume_duration_execution"
          description={`${diffHours}h ${diffMinutes}m`}
        />
        <View style={classes.priceWrapper}>
          <Text style={classes.priceText}>{`Subtotal: ${currency.format(total, {
            locale: region,
            precision: 0,
            format: '%s %v',
          })}`}</Text>
        </View>
        <View style={classes.actions}>
          <Button primary onPress={handleTerminate}>
            terminate_text
          </Button>
        </View>
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

export default ServiceResume;
