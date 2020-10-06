import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Slide from 'components/anims/Slide';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';
import {
  REQUEST_TYPE_COURIER,
  REQUEST_TYPE_SHOPPER,
  REQUEST_TYPE_TASK,
} from 'config/constants';
import NormalCard from './normal-card';
import ShopperCard from './shopper-card';
import CourierCard from './courier-card';
import TaskCard from './task-card';

const RequestCard = ({delay = 0, even, item = {}, isTriko, onSelect}) => {
  const [classes] = useStyles(styles);
  const {details = []} = item;
  const [serviceDetail] = details;
  const service = serviceDetail.service;
  const serviceAttrs = service.attrs ? JSON.parse(service.attrs) : {};
  let isShopper = false;
  let isCourier = false;
  let isTask = false;
  let Component = NormalCard;
  if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_SHOPPER) {
    isShopper = true;
    Component = ShopperCard;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_COURIER) {
    isCourier = true;
    Component = CourierCard;
  } else if (serviceAttrs && serviceAttrs.type === REQUEST_TYPE_TASK) {
    isTask = true;
    Component = TaskCard;
  }
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
            },
            classes,
          )}>
          <Component request={item} isTriko={isTriko} />
        </TouchableOpacity>
      </View>
    </Slide>
  );
};

const styles = ({palette, shadows}) => ({
  contentWrapper: {
    // backgroundColor: palette.blue,
    backgroundColor: palette.blueLightAccent1,
    flex: 1,
    height: 260,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    top: -60,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFF',
  },
  contentWrapperEven: {
    backgroundColor: palette.blueLight,
  },
  contentWrapperShopper: {
    // backgroundColor: palette.blueLight,
  },
  contentWrapperCourier: {
    // backgroundColor: palette.blueLightAccent,
  },
  contentWrapperTask: {
    // backgroundColor: palette.green,
  },
  root: {
    height: 220,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: palette.blueLightAccent1,
  },
  rootEven: {
    backgroundColor: palette.blueLight,
  },
  rootShopper: {
    // backgroundColor: palette.blueLight,
  },
  rootCourier: {
    // backgroundColor: palette.blueLightAccent,
  },
  rootTask: {
    // backgroundColor: palette.green,
  },
  rootBlock: {},
});

export default RequestCard;
