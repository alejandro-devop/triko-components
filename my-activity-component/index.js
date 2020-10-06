import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_PENDING_REQUEST_CLIENT, GET_PENDING_REQUEST_TRIKO} from './queries';
import useSession from 'hooks/useSession';
import Wrapper from './wrapper';
import Loader from './loader';
import RequestCard from './RequestCard';
import useNavigate from 'shared/hooks/use-navigate';
import NoRequestItems from './NoRequestItems';
import {
  REQUEST_TYPE_COURIER,
  REQUEST_TYPE_SHOPPER,
  REQUEST_TYPE_TASK,
} from 'config/constants';

const MyActivityComponent = ({isTriko}) => {
  const {
    stack: {client = {}, triko = {}, locale},
    setKey,
  } = useSession();
  const variables = {
    ...(isTriko ? {triko: triko.id} : {client: client.id}),
    locale,
  };
  const {navigation} = useNavigate();
  const [getPendingRequests, {data = {}, loading}] = useLazyQuery(
    isTriko ? GET_PENDING_REQUEST_TRIKO : GET_PENDING_REQUEST_CLIENT,
    {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
      variables,
    },
  );

  const requests = data.response ? data.response : [];
  const totalRequests = requests.length;
  const handleSelectItem = (request) => {
    const [detail] = request.details;
    const {service} = detail;
    const serviceAttrs = service.attrs ? JSON.parse(service.attrs) : {};
    setKey('requestDetailSelected', {
      request,
      isShopper: serviceAttrs && serviceAttrs.type === REQUEST_TYPE_SHOPPER,
      isCourier: serviceAttrs && serviceAttrs.type === REQUEST_TYPE_COURIER,
      isTask: serviceAttrs && serviceAttrs.type === REQUEST_TYPE_TASK,
    });
    navigation.navigate('request-detail');
  };
  const onRefresh = async () => {
    getPendingRequests();
  };
  useEffect(() => {
    getPendingRequests();
  }, []);
  return (
    <Wrapper onRefresh={onRefresh} refreshing={loading}>
      {loading && <Loader />}
      {!loading && requests.length === 0 && <NoRequestItems />}
      {requests.map((item, key) => (
        <RequestCard
          block={totalRequests > 3}
          delay={100 * key}
          even={key % 2 === 0}
          isTriko={isTriko}
          item={item}
          key={`request-item-${key}`}
          onSelect={handleSelectItem}
        />
      ))}
    </Wrapper>
  );
};

export default MyActivityComponent;
