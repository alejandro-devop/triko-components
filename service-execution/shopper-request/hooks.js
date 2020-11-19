import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_PRODUCT} from './queries';
import useNotify from 'hooks/useNotification';

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
