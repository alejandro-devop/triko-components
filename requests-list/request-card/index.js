import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Slide from 'components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import NormalCard from '../normal-card';
import ShopperCard from '../shopper-card';
import CourierCard from '../courier-card';
import TaskCard from '../task-card';
import styles from './styles';
import {PAYMENT_COMPLETED_STATUS} from 'config/order-statuses';
import {STATUS_CANCEL} from 'config/request-statuses';
import {isEmpty} from 'shared/utils/functions';
import {acceptedStatuses} from 'shared/hooks/use-request-status';

/**
 * This component is a generic container for the service requests, it resolves which component
 * should be used to render a service request
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param delay
 * @param even
 * @param expired
 * @param item
 * @param isTriko
 * @param onSelect
 * @param onAccept
 * @param onCancel
 * @param onViewOnMap
 * @param userLocation
 * @param onView
 * @param onStart
 * @param withStatus
 * @returns {*}
 * @constructor
 */
const RequestCard = ({
  delay = 0,
  even,
  expired,
  item = {},
  isTriko,
  onSelect,
  onAccept,
  onCancel,
  onViewOnMap,
  userLocation,
  onView,
  onStart,
  withStatus,
}) => {
  const [classes] = useStyles(styles);
  const {attributes} = item;
  const requestAttributes = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {requestType} = requestAttributes;
  let isShopper = requestType === 'shopper';
  let isCourier = requestType === 'courier';
  let isTask = requestType === 'task';
  let Component = NormalCard;
  if (isShopper) {
    Component = ShopperCard;
  } else if (isCourier) {
    Component = CourierCard;
  } else if (isTask) {
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
            rootSuccess:
              withStatus && paid && acceptedStatuses.includes(workflow),
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
              contentSuccess:
                withStatus && paid && acceptedStatuses.includes(workflow),
            },
            classes,
          )}>
          <Component
            expired={expired}
            withStatus={withStatus}
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
  expired: PropTypes.bool,
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
  withStatus: PropTypes.bool,
};

export default RequestCard;
