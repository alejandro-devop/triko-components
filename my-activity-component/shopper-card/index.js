import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cartColor from 'assets/icons/car-color.png';
import CardIcon from '../card-icon';
import ServiceRate from '../ServiceRate';
import TrikoInfo from '../TrikoInfo';
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

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const ShopperCard = ({request = {}}) => {
  const {triko = {}} = request;
  const [classes] = useStyles(styles);
  const transition = request.transition ? request.transition.workflow : '';

  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon image={cartColor} primary="SHOPPER" />
        <ServiceRate rate={10000} />
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo request={request} showDate />
        <TrikoInfo triko={triko} />
      </View>
      {acceptedStatus.includes(transition) && <ConfirmIcon />}
    </View>
  );
};

const styles = () => ({
  root: {
    flexDirection: 'row',
  },
  serviceWrapper: {
    flex: 3,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
});

export default ShopperCard;
