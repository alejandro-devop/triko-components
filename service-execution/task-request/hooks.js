import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_PRODUCT} from './queries';
import useNotify from 'shared/hooks/use-notification';
import {
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_PAYMENT,
  STATUS_FINISHED,
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_DESTINATION,
  STATUS_IN_THE_SHOP,
  STATUS_ON_MY_WAY_DESTINATION,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
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
    label = isTriko ? 'arrive_to_market' : '';
  } else if (workflow === STATUS_IN_THE_SHOP) {
    description = isTriko ? 'in_the_shopping_place' : 'in_the_shopping_place';
    title = isTriko ? 'get_products_in_list' : '';
    label = isTriko ? 'start_shopping' : '';
  } else if (workflow === STATUS_WAITING_FOR_CLIENT) {
    title = isTriko ? 'confirm_cart_total' : 'confirm_cart_total';
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
  } else if (workflow === STATUS_CONFIRM_PAYMENT) {
    title = isTriko ? '' : 'waiting_for_pay_confirmation';
  } else if (workflow === STATUS_QUALIFY_CLIENT) {
    title = 'qualify_triko';
  } else if (workflow === STATUS_QUALIFY_TRIKO) {
    title = 'qualify_client';
  } else if (workflow === STATUS_CONFIRM_FINISHED) {
    title = isTriko ? 'waiting_for_client_confirmation' : '';
  } else if (workflow === STATUS_FINISHED) {
    title = 'service_finished';
  }
  return {
    description,
    label,
    title,
  };
};
