import React, {useEffect, useState} from 'react';
import useSession from 'hooks/useSession';
import Wrapper from './wrapper';
import Loader from './loader';
import RequestCard from './RequestCard';
import useNavigate from 'shared/hooks/use-navigate';
import NoRequestItems from './NoRequestItems';
import Filter from './Filter';
import useRequestList from 'shared/hooks/use-request-list';
import {
  REQUEST_TYPE_COURIER,
  REQUEST_TYPE_SHOPPER,
  REQUEST_TYPE_TASK,
} from 'config/constants';

const MyActivityComponent = ({enableFilter, isTriko}) => {
  const {setKey} = useSession();
  const [currentFilter, setCurrentFilter] = useState(0);
  const filters = ['requests_text', 'triko_favor_text'];
  const {getPendingRequests, loading, requests = []} = useRequestList(
    currentFilter,
    isTriko,
  );
  const {navigation} = useNavigate();
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
    <>
      {enableFilter && (
        <Filter
          currentFilter={currentFilter}
          onChange={(filter) => setCurrentFilter(filter)}
          options={filters}
        />
      )}
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
            key={`request-${item.id}`}
            onSelect={handleSelectItem}
          />
        ))}
      </Wrapper>
    </>
  );
};

export default MyActivityComponent;
