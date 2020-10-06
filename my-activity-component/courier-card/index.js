import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cartColor from 'assets/icons/car-color.png';
import CardIcon from '../card-icon';
import Text from 'components/base/text';
import ServiceInfo from './ServiceInfo';
import ConfirmIcon from '../ConfirmIcon';
import Postulates from '../Postulates';
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
import {postulatesMock} from 'shared/components/my-activity-component/postulates.mock';
import BellCount from './BellCount';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const CourierCard = ({request = {}}) => {
  const postulates = postulatesMock;
  const [classes] = useStyles(styles);
  const transition = request.transition ? request.transition.workflow : '';
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon
          image={cartColor}
          primary={_t('triko_courier_label').toUpperCase()}
        />
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo request={request} isUrgent />
        {postulates.length > 0 && (
          <Postulates postulates={postulates} max={4} />
        )}
        {postulates.length === 0 && (
          <View style={classes.noTrikosLabelWrapper}>
            <Text style={classes.noTrikosLabel}>
              {_t('no_trikos_postulated')}
            </Text>
          </View>
        )}
      </View>
      {acceptedStatus.includes(transition) && <ConfirmIcon />}
      <BellCount count={postulates.length} />
    </View>
  );
};

const styles = ({palette}) => ({
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
    flex: 3,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
});

export default CourierCard;
