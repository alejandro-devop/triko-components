import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import cartColor from 'assets/icons/car-color.png';
import CardIcon from '../card-icon';
import Candidates from './candidates';
import ClientInfo from '../info-client';
import ServiceInfo from '../service-info';
import ConfirmIcon from '../ConfirmIcon';
import DistanceRender from 'shared/components/request-commons/distance-render';
import DateRender from 'shared/components/request-commons/date-render';
import shopperIcon from 'shared/assets/icons/triko-shopper.png';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import FavorIcon from '../favor-icon';
import TrikoInfo from '../info-triko';
import Button from 'components/base/buttons/button';
import {
  STATUS_ACCEPTED,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_PENDING,
  STATUS_STARTED,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import {startedStatuses} from 'shared/hooks/use-request-status';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const ShopperCard = ({
  isTriko,
  request = {},
  userLocation,
  onView,
  workflow,
  isPaid,
}) => {
  const {client = {}, triko: trikos = [], details = []} = request;
  const [serviceDetail = {}] = details;
  const [triko = {}] = trikos;
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  const transition = request.transition ? request.transition.workflow : '';
  const totalProducts = serviceDetail.products
    ? serviceDetail.products.length
    : 0;
  const isPostulated = isTriko
    ? trikos.map((item) => item.id).includes(triko.id)
    : false;
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        {isTriko && (
          <>
            <ClientInfo isTriko={isTriko} client={client} isFavor />
            <DistanceRender userLocation={userLocation} request={request} />
            <DateRender request={request} />
          </>
        )}
        {!isTriko && (
          <>
            <CardIcon isPaid={isPaid} image={cartColor} primary="SHOPPER" />
          </>
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        {isTriko && (
          <>
            <FavorIcon iconSource={shopperIcon} name={'SHOPPER'} />
            <View style={classes.productsCountWrapper}>
              <Text style={classes.productsCountText}>
                {_t('products_count_text')}
              </Text>
              <View style={classes.iconWrapper}>
                <Icon name="shopping-cart" style={classes.icon} />
                <View style={classes.countWrapper}>
                  <Text style={classes.countText}>{totalProducts}</Text>
                </View>
              </View>
            </View>
            <View style={classes.actionsWrapper}>
              <Button primary size="xs" style={classes.button} onPress={onView}>
                {_t('view_text')}
              </Button>
            </View>
          </>
        )}
        {!isTriko && (
          <>
            <ServiceInfo request={request} showDate isTriko={isTriko} />
            {workflow === STATUS_WAITING_FOR_TRIKO && (
              <Candidates request={request} />
            )}
            {workflow !== STATUS_PENDING &&
              workflow !== STATUS_WAITING_FOR_TRIKO && (
                <TrikoInfo triko={triko} />
              )}
          </>
        )}
      </View>
      {acceptedStatus.includes(transition) && <ConfirmIcon />}
      {isPostulated && !startedStatuses.includes(workflow) && (
        <View style={classes.postulatedWrapper}>
          <Text style={classes.postulatedText}>postulated_text</Text>
        </View>
      )}
    </View>
  );
};

const styles = ({palette, variables: {textSmall}}) => ({
  actionsWrapper: {
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    minWidth: 100,
  },
  countText: {
    color: '#FFF',
    fontSize: 14,
  },
  countWrapper: {
    position: 'absolute',
    borderRadius: 30,
    top: 0,
    right: 0,
    transform: [{translateX: 10}, {translateY: -10}],
    backgroundColor: palette.blue,
    paddingHorizontal: 10,
  },
  icon: {
    color: '#FFF',
  },
  iconWrapper: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: palette.orange,
    marginLeft: 5,
  },
  productsCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  postulatedWrapper: {
    position: 'absolute',
    // left: '50%',
    right: 0,
    top: 0,
    transform: [{translateX: 10}, {translateY: -10}],
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: palette.orange,
  },
  postulatedText: {
    color: palette.orange,
    fontSize: 12,
    fontWeight: '600',
  },
  productsCountText: {
    color: palette.orange,
    fontSize: textSmall,
  },
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
