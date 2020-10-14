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
import useUserLocation from 'shared/hooks/use-user-location';
import {LoadingCurtain} from 'components/base/dialogs';

const MyActivityComponent = ({
  currentFilter = 0,
  enableFilter,
  filters = [],
  isTriko,
  onChangeFilter,
  onlyFavors,
  onlyCurrentDay,
  onlyMyServices,
}) => {
  const {setKey} = useSession();
  const {location, loading: loadingLocation} = useUserLocation();
  const {getPendingRequests, loading, requests = []} = useRequestList({
    onlyFavors,
    isTriko,
    onlyCurrentDay,
    onlyMyServices,
  });
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

  const onViewOnMap = ({}) => {
    alert('View map');
  };

  const onAcceptRequest = () => {
    alert('Accept');
  };
  const onCancelRequest = () => {
    alert('Cancel');
  };

  const onView = () => {
    alert('onView');
  };

  return (
    <>
      {enableFilter && (
        <Filter
          currentFilter={currentFilter}
          onChange={(filter) =>
            onChangeFilter ? onChangeFilter(filter) : null
          }
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
            onAccept={onAcceptRequest}
            onCancel={onCancelRequest}
            userLocation={location}
            onViewOnMap={() => onViewOnMap(item)}
            onView={onView}
          />
        ))}
      </Wrapper>
      {loadingLocation && <LoadingCurtain />}
    </>
  );
};

export default MyActivityComponent;
