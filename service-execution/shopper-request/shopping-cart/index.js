import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import ProductItem from '../product-item';
import Button from 'shared/components/base/buttons/button';
import ProductEdit from '../product-edit';
import CartTotal from '../cart-total';
import {isEmpty} from 'shared/utils/functions';
import useRequestUpdate from 'shared/hooks/use-request-update';
import {LoadingCurtain} from 'components/base/dialogs';
import {
  STATUS_SHOPPING,
  STATUS_WAITING_FOR_CLIENT,
} from 'config/request-statuses';

const ShoppingCart = ({
  isTriko,
  onFinished,
  request = {},
  onClose,
  onConfirmCart,
  refreshRequest,
  workflow,
}) => {
  const [serviceDetail = {}] = request.details;
  const {products = []} = serviceDetail;
  const cart = !isEmpty(serviceDetail.products) ? serviceDetail.products : [];
  const [selected, setSelected] = useState(null);
  const {updateRequest, loading} = useRequestUpdate();

  const [classes] = useStyles(styles);
  const added = cart.reduce((accumulator, currentItem) => {
    const productAttrs = !isEmpty(currentItem.attrs)
      ? JSON.parse(currentItem.attrs)
      : {};
    if (productAttrs.found) {
      accumulator++;
    }
    return accumulator;
  }, 0);

  const handleSelectItem = (item) => setSelected(item);

  const handleProductSave = () => {
    setSelected(null);
    if (refreshRequest) {
      refreshRequest();
    }
  };

  const handleFinish = async () => {
    await updateRequest(request);
    if (refreshRequest && onFinished) {
      refreshRequest();
      onFinished();
    }
  };

  return (
    <>
      <View style={classes.root}>
        {products.map((productItem, key) => (
          <ProductItem
            onSelect={handleSelectItem}
            disableEdit={!isTriko || workflow !== STATUS_SHOPPING}
            productItem={productItem}
            key={`product-${key}`}
          />
        ))}
        <CartTotal request={request} />
        <View style={classes.actionsRow}>
          {isTriko && workflow === STATUS_SHOPPING && (
            <Button disabled={added === 0} primary onPress={handleFinish}>
              finish_shopping
            </Button>
          )}
          {!isTriko && workflow === STATUS_WAITING_FOR_CLIENT && (
            <Button primary onPress={onConfirmCart}>
              continue_text
            </Button>
          )}
          <Button secondary onPress={onClose}>
            close_cart
          </Button>
        </View>
      </View>
      {Boolean(selected) && (
        <ProductEdit
          request={request}
          open
          product={selected}
          onSaved={handleProductSave}
          onClose={() => setSelected(null)}
        />
      )}
      {loading && <LoadingCurtain />}
    </>
  );
};

export default ShoppingCart;
