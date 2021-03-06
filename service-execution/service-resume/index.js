import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import Text from 'components/base/text';
import RowItem from '../commons/RowItem';
import styles from './styles';
import Label from 'shared/components/base/label';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import currency from 'currency-formatter';
import moment from 'moment';
import {
  STATUS_CONFIRM_PAYMENT,
  STATUS_GOING_TO_SHOP,
  STATUS_ON_GOING,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';
import Button from 'shared/components/base/buttons/button';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import {LoadingCurtain} from 'components/base/dialogs';
import {isEmpty} from 'shared/utils/functions';
import palette from 'themes/styles/palette';

const ServiceResume = ({
  onTerminate,
  isShopper,
  isCourier,
  isTask,
  isTriko,
  request,
}) => {
  const [classes] = useStyles(styles);
  const {stack = {}} = useSession();
  const [shareWithCommunity, setShareWithCommunity] = useState();
  const {sendRequest, loading} = useRequestUpdateAttrs(request);
  const {region} = stack;
  const {application_date, order = {}, history = [], duration = 0} = request;

  let startTransition = null;
  let endTransition = null;
  if (isShopper) {
    startTransition = history.find(
      (item) => item.transition.workflow === STATUS_GOING_TO_SHOP,
    );
    endTransition = history.find(
      (item) => item.transition.workflow === STATUS_CONFIRM_PAYMENT,
    );
  } else if (isCourier) {
    startTransition = history.find(
      (item) => item.transition.workflow === STATUS_ON_GOING,
    );
    endTransition = history.find(
      (item) => item.transition.workflow === STATUS_QUALIFY_CLIENT,
    );
  } else {
    startTransition = history.find(
      (item) => item.transition.workflow === STATUS_STARTED,
    );
    endTransition = history.find((item) =>
      isTriko
        ? item.transition.workflow === STATUS_QUALIFY_CLIENT
        : item.transition.workflow === STATUS_QUALIFY_TRIKO,
    );
  }

  if (isEmpty(startTransition) || isEmpty(endTransition)) {
    return null;
  }

  const scheduledDate = moment(application_date, 'YYYY-MM-DD HH:mm:ss');
  const startDate = moment(startTransition.created_at, 'YYYY-MM-DD HH:mm:ss');
  const endDate = moment(endTransition.created_at, 'YYYY-MM-DD HH:mm:ss');
  const diffHours = endDate.diff(startDate, 'hours');
  const diffMinutes = endDate.diff(startDate, 'minutes') - diffHours * 60;
  const total = order ? order.total : 0;

  const handleTerminate = async () => {
    await sendRequest({
      attrs: isTriko
        ? {terminatedTriko: true, trikoPost: shareWithCommunity}
        : {terminatedClient: true, clientPost: shareWithCommunity},
    });
    if (onTerminate) {
      onTerminate();
    }
  };
  const isFavor = isShopper || isCourier || isTask;
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
        {!isFavor && (
          <RowItem
            icon="clock"
            title="resume_duration_scheduled"
            description={`${duration} Hrs`}
          />
        )}
        <RowItem
          icon="clock"
          title="resume_duration_execution"
          description={`${diffHours}h ${diffMinutes}m`}
        />
        <View style={classes.switchWrapperRow}>
          <Label>share_with_my_community</Label>
          <View style={classes.switchWrapper}>
            <Switch
              value={shareWithCommunity}
              trackColor={{true: palette.blue}}
              onValueChange={() => setShareWithCommunity(!shareWithCommunity)}
            />
          </View>
        </View>
        {!isFavor && !isTriko && (
          <View style={classes.priceWrapper}>
            <Text style={classes.priceText}>total_text</Text>
            <Text style={classes.priceText}>{`: ${currency.format(total, {
              locale: region,
              precision: 0,
              format: '%s %v',
            })}`}</Text>
          </View>
        )}
        <View style={classes.actions}>
          <Button primary onPress={handleTerminate} delayAction>
            terminate_text
          </Button>
        </View>
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

export default ServiceResume;
