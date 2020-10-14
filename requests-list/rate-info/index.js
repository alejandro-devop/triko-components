import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import Text from 'components/base/text';
import useCurrency from 'hooks/useCurrency';
import useTranslation from 'hooks/useTranslation';

/**
 * This component renders the duration and price for the current request
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param request
 * @returns {*}
 * @constructor
 */
const RateInfo = ({request}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {myServices},
  } = useSession();
  const {format} = useCurrency();
  const {_t} = useTranslation();
  const {attrs = {}, duration, details = []} = request;
  const requestDuration = parseInt(duration, 10);
  const price = details.reduce((accumulator, currentItem) => {
    const service = myServices.find(
      (item) => item.id === currentItem.service.id,
    );
    if (service) {
      accumulator = service.price_base;
    }
    return accumulator;
  }, 0);
  const {tip, transport} = attrs;
  const total =
    price * requestDuration + parseFloat(tip) + parseFloat(transport);
  return (
    <View style={classes.root}>
      <Text style={classes.totalText}>
        {_t('request_detail_duration_total', {
          duration:
            `${duration} ` +
            _t(requestDuration > 1 ? 'hours_text' : 'hour_text'),
        })}
      </Text>
      <View style={classes.priceWrapper}>
        <Text style={classes.priceText}>{format(total)}</Text>
      </View>
    </View>
  );
};

export default RateInfo;
