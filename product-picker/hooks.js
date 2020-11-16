import {useState} from 'react';
import {GET_PRODUCTS, SAVE_PRODUCT} from './queries';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';

export const useProductsList = (options = {}) => {
  const {query, categories = []} = options;
  const {
    stack: {locale},
  } = useSession();
  const {data = {}, loading, refetch} = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'no-cache',
    variables: {
      product: query,
      categories: JSON.stringify(categories.map((item) => item.id)),
      locale,
    },
  });
  const refresh = async () => {
    await refetch({
      product: query,
      categories: JSON.stringify(categories.map((item) => item.id)),
      locale,
    });
  };
  return {
    products:
      data.response && Array.isArray(data.response) ? data.response : [],
    loading,
    refresh,
  };
};

export const useSaveProduct = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(SAVE_PRODUCT);
  const {error, success} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/product-picker/hooks.js',
  });
  const saveProduct = async (payload = {}) => {
    setLoading(true);
    try {
      const {
        market = {},
        categories = [],
        name,
        description,
        attrs = {},
      } = payload;
      await sendRequest({
        variables: {
          market: market.id,
          categories: JSON.stringify(categories),
          name,
          description,
          attrs: JSON.stringify(attrs),
        },
      });
      setLoading(false);
      success('product_save_success');
    } catch (e) {
      reportError(e);
      error('Error while saving the product');
      setLoading(false);
    }
  };
  return {
    loading,
    saveProduct,
  };
};
