import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import Text from 'components/base/text';
import useCurrency from 'shared/hooks/use-currency';
import useTranslation from 'shared/hooks/use-translate';
import {useCalcRate} from 'shared/hooks/use-rate-calc';
import CircularLoader from 'shared/components/loaders/circular-loader';
import StatusCard from 'shared/components/requests-list/status-card';
import {STATUS_FINISHED} from 'config/request-statuses';
import {isEmpty} from 'shared/utils/functions';

/**
 * This component renders the duration and price for the current request
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param isPaid
 * @param request
 * @param workflow
 * @returns {*}
 * @constructor
 */
const RateInfo = ({isPaid, request, workflow}) => {
  const [classes] = useStyles(styles);
  const {format} = useCurrency();
  const {_t} = useTranslation();
  const {attrs = {}, attributes, duration} = request;
  const {transport} = attrs;
  const {calculatedTip = 0} = !isEmpty(attributes)
    ? JSON.parse(attributes)
    : {};
  const {loading, total: subTotal} = useCalcRate({
    request,
  });
  const total = subTotal + parseFloat(transport) + calculatedTip;
  const requestDuration = parseInt(duration, 10);
  return (
    <View style={classes.root}>
      {!isPaid && (
        <>
          <Text style={classes.totalText}>
            {_t('request_detail_duration_total', {
              duration:
                `${duration} ` +
                _t(requestDuration > 1 ? 'hours_text' : 'hour_text'),
            })}
          </Text>
          <View style={classes.priceWrapper}>
            {loading && <CircularLoader color="#FFF" size="small" />}
            {!loading && <Text style={classes.priceText}>{format(total)}</Text>}
          </View>
        </>
      )}

      {isPaid && workflow !== STATUS_FINISHED && (
        <>
          <StatusCard isPaid={isPaid} workflow={workflow} />
        </>
      )}
    </View>
  );
};

export default RateInfo;
