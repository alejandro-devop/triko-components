import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'components/base/text';
import useCurrency from 'hooks/useCurrency';
import useTranslation from 'hooks/useTranslation';
import {useCalcRate} from 'shared/hooks/use-rate-calc';
import CircularLoader from 'shared/components/loaders/circular-loader';
import StatusCard from 'shared/components/requests-list/status-card';

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
  const {duration} = request;
  const {loading, total} = useCalcRate({
    request,
  });
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

      {isPaid && (
        <>
          <StatusCard isPaid={isPaid} workflow={workflow} />
        </>
      )}
    </View>
  );
};

export default RateInfo;
