import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import PreImage from 'shared/components/base/pre-image';
import palette from 'themes/styles/palette';

const ShoppingItem = ({shoppingItem = {}}) => {
  const {product = {}, quantity, measure = {}} = shoppingItem;
  const {name, image = {}} = product;
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={[classes.nameContainer]}>
        <Text style={[classes.text, classes.productName]}>{name}</Text>
      </View>
      <View style={[classes.container, classes.quantityContainer]}>
        <Text style={[classes.text, classes.quantity]}>{quantity}</Text>
      </View>
      <View style={[classes.container, classes.unitContainer]}>
        <Text style={[classes.text, classes.unit]}>{measure.shortName}</Text>
      </View>
      <View style={[classes.container, classes.photoContainer]}>
        <View style={classes.photoWrapper}>
          {Boolean(image.url_download_file) && (
            <PreImage
              source={{uri: image.url_download_file}}
              style={classes.photo}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = () => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  unitContainer: {
    flex: 1,
  },
  quantityContainer: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
  },
  photoWrapper: {
    width: 30,
    height: 30,
  },
  productName: {},
  root: {
    borderColor: palette.grayLighter,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ShoppingItem;
