import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import {isEmpty} from 'shared/utils/functions';
import useCurrency from 'hooks/useCurrency';
import classNames from 'shared/utils/classnames';

const ProductItem = ({onSelect, productItem = {}}) => {
  const [classes] = useStyles(styles);
  const {
    image,
    measure = {},
    product,
    price = 0,
    quantity = 0,
    attrs,
  } = productItem;
  const productAttrs = !isEmpty(attrs) ? JSON.parse(attrs) : {};
  const {format} = useCurrency();
  const handleSelect = () => {
    if (onSelect) {
      onSelect(productItem);
    }
  };
  const {found, notFound} = productAttrs;

  return (
    <TouchableOpacity
      style={classNames(
        {root: true, rootAdded: found, rootNotFound: notFound},
        classes,
      )}
      onPress={handleSelect}>
      {found && <Icon name="check-circle" style={classes.icon} />}
      <View style={classes.avatarWrapper}>
        {isEmpty(image) && (
          <Icon name="shopping-bag" style={classes.avatarIcon} />
        )}
      </View>
      <View style={classes.textWrapper}>
        <Text style={[classes.text, classes.productNameText]}>
          {product.name}
        </Text>
        <Text style={[classes.text, classes.textUnit]}>{quantity}</Text>
        <Text style={[classes.text, classes.textUnit]}>
          {measure.shortName}
        </Text>
        {!isEmpty(price) && (
          <View style={classes.priceWrapper}>
            <Text style={classes.priceText}>{format(price)}</Text>
          </View>
        )}
      </View>
      {notFound && <View style={classes.notFoundLine} />}
    </TouchableOpacity>
  );
};

export default ProductItem;
