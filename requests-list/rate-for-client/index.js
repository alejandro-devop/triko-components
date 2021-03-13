import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import useCurrency from 'hooks/useCurrency';
import {useCalcRateClient} from 'shared/hooks/use-rate-calc';
import classNames from 'shared/utils/classnames';
import styles from './styles';

const RateForClient = ({isPaid, request = {}}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {format} = useCurrency();
  const {total} = useCalcRateClient({
    request: {
      ...request,
      triko: request.triko[0],
    },
  });

  return (
    <View style={classes.root}>
      <Text style={classes.label}>{_t('total_text')}</Text>
      <Text style={classNames({rateText: true, rateTextPaid: isPaid}, classes)}>
        {format(total)}
      </Text>
    </View>
  );
};

RateForClient.propTypes = {
  isPaid: PropTypes.bool,
  request: PropTypes.shape({
    triko: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      PropTypes.array,
    ]),
  }),
};

export default RateForClient;
