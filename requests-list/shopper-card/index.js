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
  STATUS_PAYMENT,
  STATUS_PENDING,
  STATUS_STARTED,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import {startedStatuses} from 'shared/hooks/use-request-status';
import {isEmpty} from 'shared/utils/functions';
import {useSession} from 'hooks/index';
import useNavigate from 'shared/hooks/use-navigate';
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

const ShopperCard = ({
  isTriko,
  request = {},
  userLocation,
  onView,
  onStart,
  workflow,
  isPaid,
}) => {
  const {attributes, client = {}, triko: trikos = [], details = []} = request;
  const {setAll} = useSession();
  const {navigation} = useNavigate();
  const requestAttributes = !isEmpty(attributes) ? JSON.parse(attributes) : {};
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

  const handleContinueShopper = () => {
    const {shopperForm = {}} = requestAttributes;
    setAll({
      requestService: {
        address: shopperForm.address,
        services: [serviceDetail.service],
      },
      shopperRequest: request,
      shopperForm,
    });
    navigation.navigate('shopper');
  };

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
              {![STATUS_PAYMENT, STATUS_FINISHED].includes(workflow) && (
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
            <ServiceInfo request={request} showDate isTriko={isTriko} />
            {workflow === STATUS_WAITING_FOR_TRIKO && (
              <Candidates request={request} />
            )}
            {workflow !== STATUS_PENDING &&
              workflow !== STATUS_WAITING_FOR_TRIKO && (
                <TrikoInfo triko={triko} />
              )}
            {workflow === STATUS_PENDING && (
              <View style={classes.actionsPending}>
                <Text style={classes.textPending}>
                  continue_making_the_cart
                </Text>
                <Button primary size="xxs" onPress={handleContinueShopper}>
                  continue_text
                </Button>
              </View>
            )}
            {workflow === STATUS_ACCEPTED && (
              <View style={classes.actionsPending}>
                <Button primary size="xxs" onPress={onView}>
                  make_payment
                </Button>
              </View>
            )}
          </>
        )}
      </View>
      {acceptedStatus.includes(transition) && <ConfirmIcon />}
      {isTriko && workflow === STATUS_WAITING_FOR_TRIKO && (
        <PostulatedMessage request={request} isTriko={isTriko} />
      )}
    </View>
  );
};

const styles = ({palette, variables: {textSmall}}) => ({
  actionsPending: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  actionsWrapper: {
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    minWidth: 100,
  },
  altButton: {
    color: palette.success,
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
  textPending: {
    fontSize: textSmall,
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
