import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import useCurrency from 'shared/hooks/use-currency';

const ProductTotal = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const [serviceDetail = {}] = request.details;
  const {format} = useCurrency();
  return (
    <View style={classes.root}>
      <Text style={[classes.text, classes.title]}>total_text</Text>
      <View style={classes.priceWrapper}>
        <Text style={classes.priceText}>{format(serviceDetail.price)}</Text>
      </View>
    </View>
  );
};

export default ProductTotal;
