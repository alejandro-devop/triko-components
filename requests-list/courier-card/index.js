import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cartColor from 'assets/icons/car-color.png';
import CardIcon from '../card-icon';
import ClientInfo from '../info-client';
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
import {postulatesMock} from 'shared/components/requests-list/postulates.mock';
import BellCount from './BellCount';
import DistanceRender from 'shared/components/request-commons/distance-render';
import serviceIcon from 'assets/icons/triko-courrier.png';
import FavorIcon from '../favor-icon';
import DateRender from 'shared/components/request-commons/date-render';
import Button from 'shared/components/base/buttons/button';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const CourierCard = ({
  isTriko,
  request = {},
  userLocation,
  onViewOnMap,
  onView,
}) => {
  const postulates = postulatesMock;
  const {client = {}} = request;
  const [classes] = useStyles(styles);
  const transition = request.transition ? request.transition.workflow : '';
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        {isTriko && (
          <>
            <ClientInfo isTriko={isTriko} client={client} isFavor />
            <DistanceRender
              onViewOnMap={onViewOnMap}
              userLocation={userLocation}
              request={request}
            />
            <DateRender request={request} />
          </>
        )}
        {!isTriko && (
          <CardIcon
            image={cartColor}
            primary={_t('triko_courier_label').toUpperCase()}
          />
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        {isTriko && (
          <>
            <FavorIcon iconSource={serviceIcon} name={_t('triko_courier')} />
            <View style={classes.actionsWrapper}>
              <Button primary size="xs" style={classes.button} onPress={onView}>
                {_t('view_text')}
              </Button>
            </View>
          </>
        )}
        {!isTriko && (
          <>
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
          </>
        )}
      </View>
      {!isTriko && (
        <>
          {acceptedStatus.includes(transition) && <ConfirmIcon />}
          <BellCount count={postulates.length} />
        </>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  actionsWrapper: {
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    minWidth: 100,
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
    flex: 3,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
});

export default CourierCard;
