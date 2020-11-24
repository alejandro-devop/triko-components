import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cardIcon from 'shared/assets/icons/triko-courier.png';
import CardIcon from '../card-icon';
import ClientInfo from '../info-client';
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
  STATUS_PAYMENT,
  STATUS_STARTED,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import {postulatesMock} from 'shared/components/requests-list/postulates.mock';
import BellCount from './BellCount';
import DistanceRender from 'shared/components/request-commons/distance-render';
import serviceIcon from 'shared/assets/icons/triko-courier.png';
import FavorIcon from '../favor-icon';
import DateRender from 'shared/components/request-commons/date-render';
import Button from 'shared/components/base/buttons/button';
import Candidates from 'shared/components/requests-list/shopper-card/candidates';
import PostulatedMessage from 'shared/components/requests-list/postulated-message';

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
  workflow,
  onStart,
}) => {
  const postulates = postulatesMock;
  const {client = {}, triko: trikos = []} = request;
  const [classes] = useStyles(styles);
  const transition = request.transition ? request.transition.workflow : '';
  const {_t} = useTranslation();
  const [triko = {}] = trikos;
  const isPostulated = isTriko
    ? trikos.map((item) => item.id).includes(triko.id)
    : false;
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
            image={cardIcon}
            primary={_t('triko_courier_label').toUpperCase()}
          />
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        {isTriko && (
          <>
            <FavorIcon iconSource={serviceIcon} name={_t('triko_courier')} />
            <View style={classes.actionsWrapper}>
              {workflow !== STATUS_PAYMENT && (
                <Button
                  primary
                  size="xs"
                  style={classes.button}
                  onPress={onView}>
                  {_t('view_text')}
                </Button>
              )}
              {workflow === STATUS_PAYMENT && (
                <Button
                  alternative
                  size="xs"
                  textStyle={classes.altButton}
                  onPress={onStart}>
                  start_text
                </Button>
              )}
            </View>
          </>
        )}
        {!isTriko && (
          <>
            <ServiceInfo request={request} isUrgent />
            <Candidates request={request} max={6} />
            {/*{postulates.length > 0 && (*/}
            {/*  <Postulates postulates={postulates} max={4} />*/}
            {/*)}*/}
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
      {!isTriko && request.trikos && (
        <>
          {acceptedStatus.includes(transition) && <ConfirmIcon />}
          <BellCount
            count={
              request.trikos && Array.isArray(request.trikos)
                ? request.trikos.length
                : 0
            }
          />
        </>
      )}
      {isTriko && workflow === STATUS_WAITING_FOR_TRIKO && (
        <PostulatedMessage request={request} isTriko={isTriko} />
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  altButton: {
    color: palette.success,
  },
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
