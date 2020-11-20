import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_PRODUCT} from './queries';
import useNotify from 'hooks/useNotification';
import {
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_DESTINATION,
  STATUS_IN_THE_SHOP,
  STATUS_ON_MY_WAY_DESTINATION,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_WAITING_FOR_CLIENT,
} from 'config/request-statuses';

export const useUpdateProduct = (request = {}, originalProduct = {}) => {
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/components/service-execution/shopper-request/hooks.js',
  });
  const [serviceDetail = {}] = request.details;
  const [sendRequest] = useMutation(UPDATE_PRODUCT);
  const {id: cartId, measure = {}} = originalProduct;
  const {error} = useNotify();
  const updateProduct = async (payload = payload) => {
    setLoading(true);
    try {
      const {product = {}, units, price, found, oldProduct = {}} = payload;
      const variables = {
        detail: serviceDetail.id,
        product: JSON.stringify({
          productId: product.id,
          units,
          price,
          measureId: measure.id,
          attrs: {found, notFound: !found, oldProduct},
        }),
        cart: cartId,
      };
      await sendRequest({
        variables,
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      setLoading(false);
      error('Error while updating the product');
    }
  };

  return {
    loading,
    updateProduct,
  };
};

export const useStepDescriptor = (isTriko, workflow, request = {}) => {
  let title = '';
  let description = '';
  let label = '';
  const {address} = request;
  if (workflow === STATUS_GOING_TO_SHOP) {
    description = isTriko ? 'indicate_arrival' : 'triko_going_to_shop';
  } else if (workflow === STATUS_IN_THE_SHOP) {
    description = isTriko ? '' : 'in_the_shopping_place';
    title = isTriko ? 'get_products_in_list' : '';
  } else if (workflow === STATUS_WAITING_FOR_CLIENT) {
    title = isTriko ? 'go_to_cash_register' : 'confirm_cart_total';
  } else if (workflow === STATUS_PAYING_CART) {
    title = 'making_payment';
    description = isTriko ? '' : 'wait_for_the_triko_to_pay';
  } else if (workflow === STATUS_ON_MY_WAY_DESTINATION) {
    title = 'going_to_deliver_address';
    description = address;
  } else if (workflow === STATUS_IN_THE_DESTINATION) {
    title = 'in_destination_point';
    description = address;
  } else if (workflow === STATUS_PAYING_ORDER) {
    title = 'waiting_for_client_payment';
  }
  return {
    description,
    label,
    title,
  };
};
