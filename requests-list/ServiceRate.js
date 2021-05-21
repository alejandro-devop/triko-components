import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';
import useCurrency from 'shared/hooks/use-currency';
import {useCalcRateClient} from 'shared/hooks/use-rate-calc';
import classNames from 'shared/utils/classnames';

const ServiceRate = ({isPaid, request = {}}) => {
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

const styles = ({palette}) => ({
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  root: {
    marginTop: 20,
  },
  rateText: {
    color: palette.orange,
    fontWeight: '600',
    fontSize: 18,
  },
  rateTextPaid: {
    color: '#FFF',
  },
});

export default ServiceRate;
