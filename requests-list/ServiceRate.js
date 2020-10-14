import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import useCurrency from 'hooks/useCurrency';

const ServiceRate = ({rate = 0}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {format} = useCurrency();
  return (
    <View style={classes.root}>
      <Text style={classes.label}>{_t('total_text')}</Text>
      <Text style={classes.rateText}>{format(rate)}</Text>
    </View>
  );
};

const styles = ({palette}) => ({
  label: {
    fontSize: 14,
    fontWeight: '400',
  },
  root: {
    marginTop: 20,
  },
  rateText: {
    color: palette.orange,
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ServiceRate;
