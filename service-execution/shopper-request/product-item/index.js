import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import {isEmpty} from 'shared/utils/functions';
import useCurrency from 'hooks/useCurrency';
import classNames from 'shared/utils/classnames';

const ProductItem = ({disableEdit, onSelect, productItem = {}}) => {
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
  const Wrapper = disableEdit ? View : TouchableOpacity;
  return (
    <Wrapper
      style={classNames(
        {root: true, rootAdded: found, rootNotFound: notFound},
        classes,
      )}
      onPress={handleSelect}>
      <View style={classes.textWrapper}>
        {found && <Icon name="check-circle" style={classes.icon} />}
        <View style={classes.avatarWrapper}>
          {isEmpty(image) && (
            <Icon name="shopping-bag" style={classes.avatarIcon} />
          )}
        </View>
        <Text style={[classes.text, classes.productNameText]}>
          {product.name}
        </Text>
        <View style={classes.unitWrapper}>
          <Text style={[classes.text, classes.textUnit]}>{quantity}</Text>
          <Text style={[classes.text, classes.textUnit]}>
            {measure.shortName}
          </Text>
        </View>
      </View>
      {!isEmpty(price) && (
        <View style={classes.priceWrapper}>
          <Text style={classes.priceText}>{format(price)}</Text>
          {notFound && <View style={classes.notFoundLine} />}
        </View>
      )}
    </Wrapper>
  );
};

export default ProductItem;
