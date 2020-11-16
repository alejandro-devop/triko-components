import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Slide from 'components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import {
  REQUEST_TYPE_COURIER,
  REQUEST_TYPE_SHOPPER,
  REQUEST_TYPE_TASK,
  SERVICES_TYPES,
} from 'config/constants';
import NormalCard from '../normal-card';
import ShopperCard from '../shopper-card';
import CourierCard from '../courier-card';
import TaskCard from '../task-card';
import styles from './styles';
import {PAYMENT_COMPLETED_STATUS} from 'config/order-statuses';
import {STATUS_CANCEL} from 'config/request-statuses';

/**
 * This component is a generic container for the service requests, it resolves which component
 * should be used to render a service request
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param delay
 * @param even
 * @param item
 * @param isTriko
 * @param onSelect
 * @param onAccept
 * @param onCancel
 * @param onViewOnMap
 * @param userLocation
 * @param onView
 * @param onStart
 * @returns {*}
 * @constructor
 */
const RequestCard = ({
  delay = 0,
  even,
  item = {},
  isTriko,
  onSelect,
  onAccept,
  onCancel,
  onViewOnMap,
  userLocation,
  onView,
  onStart,
}) => {
  const [classes] = useStyles(styles);
  const {details = [], type = {}} = item;
  const [serviceDetail] = details;
  const service = serviceDetail.service;
  const serviceAttrs = service.attrs ? JSON.parse(service.attrs) : {};
  let isShopper = false;
  let isCourier = false;
  let isTask = false;
  let Component = NormalCard;
  if (type.id === SERVICES_TYPES.bag) {
    isShopper = true;
    Component = ShopperCard;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_COURIER) {
    isCourier = true;
    Component = CourierCard;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_TASK) {
    isTask = true;
    Component = TaskCard;
  }
  const {transition = {}, order = {}} = item;
  const {workflow: orderWorkflow} =
    order && order.transition ? order.transition : {};
  const workflow = transition ? transition.workflow : '';
  const paid = orderWorkflow === PAYMENT_COMPLETED_STATUS;
  return (
    <Slide delay={delay}>
      <View
        style={classNames(
          {
            root: true,
            rootEven: even,
            rootShopper: isShopper,
            rootCourier: isCourier,
            rootTask: isTask,
            rootPaid: paid && workflow !== STATUS_CANCEL,
          },
          classes,
        )}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => (onSelect ? onSelect(item) : null)}
          style={classNames(
            {
              contentWrapper: true,
              contentWrapperEven: even,
              contentWrapperShopper: isShopper,
              contentWrapperCourier: isCourier,
              contentWrapperTask: isTask,
              contentWrapperPaid: paid,
            },
            classes,
          )}>
          <Component
            request={item}
            isTriko={isTriko}
            onAccept={onAccept}
            onCancel={onCancel}
            onViewOnMap={onViewOnMap}
            onView={onView}
            onStart={onStart}
            userLocation={userLocation}
            workflow={workflow}
            isPaid={paid}
          />
        </TouchableOpacity>
      </View>
    </Slide>
  );
};

RequestCard.propTypes = {
  delay: PropTypes.number,
  even: PropTypes.bool,
  item: PropTypes.shape({
    details: PropTypes.arrayOf(
      PropTypes.shape({
        service: PropTypes.object,
      }),
    ),
  }),
  isTriko: PropTypes.bool,
  onSelect: PropTypes.func,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  onViewOnMap: PropTypes.func,
  userLocation: PropTypes.shape({
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onView: PropTypes.func,
};

export default RequestCard;
