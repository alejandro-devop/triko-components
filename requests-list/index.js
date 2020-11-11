import React, {useEffect} from 'react';
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
import useRequestUpdate from 'shared/hooks/use-request-update';

const MyActivityComponent = ({
  currentFilter = 0,
  enableFilter,
  filters = [],
  isTriko,
  onChangeFilter,
  onlyPending,
  onlyFavors,
  onlyCurrentDay,
  onlyMyServices,
}) => {
  const {setKey} = useSession();
  const {location, loading: loadingLocation} = useUserLocation();
  const {getPendingRequests, loading, requests = []} = useRequestList({
    onlyFavors,
    onlyPending,
    isTriko,
    onlyCurrentDay,
    onlyMyServices,
  });
  const {navigation} = useNavigate();
  const {
    loading: updatingRequest,
    acceptRequest,
    cancelRequest,
  } = useRequestUpdate();

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

  const onViewOnMap = ({}) => {};

  const onAcceptRequest = async (selectedRequest) => {
    await acceptRequest(selectedRequest);
  };
  const onCancelRequest = async (selectedRequest) => {
    await cancelRequest(selectedRequest);
  };

  const onView = () => {};

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
            onAccept={() => onAcceptRequest(item)}
            onCancel={() => onCancelRequest(item)}
            userLocation={location}
            onViewOnMap={() => onViewOnMap(item)}
            onView={() => onView(item)}
          />
        ))}
      </Wrapper>
      {loadingLocation && <LoadingCurtain />}
      {updatingRequest && <LoadingCurtain />}
    </>
  );
};

export default MyActivityComponent;
