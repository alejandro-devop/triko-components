import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import ImageIcon from 'main/components/ImageIcon';
import {useStyles} from 'hooks';
import currency from 'currency-formatter';

const ServiceItem = ({item, locale = 'en-US'}) => {
  const {icon, name, price = 0} = item;
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <ImageIcon wrapperClass={classes.iconWrapper} source={{uri: icon}} />
      <Text variant="caption" style={[classes.text]}>
        {name}
      </Text>
      <Text variant="caption" style={[classes.text, classes.price]}>
        {`${currency.format(price, {locale, decimalDigits: 0})}`}
      </Text>
    </View>
  );
};

const styles = ({palette, shadows}) => ({
  root: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 100,
    ...shadows.shadow1,
    marginBottom: 10,
  },
  price: {
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: palette.blue,
  },
});

export default ServiceItem;
