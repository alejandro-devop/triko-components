import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useSession from 'hooks/useSession';
import Wrapper from './wrapper';
import Loader from './loader';
import RequestCard from './request-card';
import useNavigate from 'shared/hooks/use-navigate';
import NoRequestItems from './NoRequestItems';
import Filter from './Filter';
import useRequestList from 'shared/hooks/use-request-list';
import ViewOnMap from './view-on-map';
import useUserLocation from 'shared/hooks/use-user-location';
import {LoadingCurtain} from 'components/base/dialogs';
import useRequestUpdate from 'shared/hooks/use-request-update';
import ConfirmMessage from 'shared/components/requests-list/confirm-message';
import {isEmpty} from 'shared/utils/functions';
import useMyServices from 'shared/hooks/use-my-services';
import {startedStatuses} from 'shared/hooks/use-request-status';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import useFbListener from 'shared/hooks/use-fb-listener';

const TrikoServicesFetcher = () => {
  useMyServices();
  return null;
};

/**
 * Component for render  pending request for clients and trikos.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param currentFilter
 * @param enableFilter
 * @param filters
 * @param filterPrimary
 * @param isTriko
 * @param onChangeFilter
 * @param onlyPending
 * @param onlyFavors
 * @param onlyCurrentDay
 * @param onlyMyServices
 * @param noFinished
 * @param noCanceled
 * @param withStatus
 * @param allTypes
 * @param noRunning
 * @returns {*}
 * @constructor
 */
const MyActivityComponent = ({
  currentFilter = 0,
  enableFilter,
  filters = [],
  filterPrimary,
  isTriko,
  onChangeFilter,
  onlyPending,
  onlyFavors,
  onlyCurrentDay,
  onlyAccepted,
  noFinished,
  noCanceled,
  allTypes,
  noRunning,
  withStatus,
  nearest,
  onlyOwned,
  onlyFutureEvents,
  onlyMyServices,
}) => {
  const {setKey} = useSession();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [rejecting, setRejecting] = useState(false);
  const [accepting, setApproving] = useState(false);
  const {location, loading: loadingLocation} = useUserLocation();
  const {
    getPendingRequests,
    loading,
    requests = [],
  } = useRequestList({
    allTypes,
    noRunning,
    onlyFavors,
    onlyPending,
    isTriko,
    onlyOwned,
    onlyCurrentDay,
    onlyFutureEvents,
    onlyAccepted,
    nearest,
    onlyMyServices,
    noFinished,
    noCanceled,
  });

  const {navigation} = useNavigate();
  const {
    loading: updatingRequest,
    acceptRequest,
    cancelRequest,
    updateRequest,
  } = useRequestUpdate();

  const totalRequests = requests.length;
  const currentDate = moment();

  /**
   * This function allows to validate if a request has been expired.
   * @param date
   * @returns {boolean}
   */
  const isExpired = ({application_date: date}) => {
    const requestDate = moment(date, 'YYYY-MM-DD HH:mm:ss');
    const timeDiff = requestDate.diff(currentDate, 'minutes');
    return timeDiff < 0;
  };

  /**
   * Used to store the selected service as the service to display in the detail screen.
   * @param request
   */
  const handleSelectItem = (request) => {
    setOpenDetail(true);
    const {workflow} = request.transition;
    const {attributes} = request;
    const requestAttributes = !isEmpty(attributes)
      ? JSON.parse(attributes)
      : {};
    const {requestType} = requestAttributes;
    const requestPayload = {
      isShopper: requestType === 'shopper',
      isCourier: requestType === 'courier',
      isTask: requestType === 'task',
    };
    if (startedStatuses.includes(workflow)) {
      setKey('selectedToExecution', {
        ...request,
        ...requestPayload,
      });
      navigation.navigate('execution');
    } else {
      setKey('requestDetailSelected', {request, ...requestPayload});
      navigation.navigate('request-detail');
    }
  };

  /**
   * Used to execute logic associated with the requests refetch.
   * @returns {Promise<void>}
   */
  const onRefresh = async () => {
    await getPendingRequests();
  };

  useFbListener(() => {
    onRefresh();
  }, 'refreshPendingServices');

  useEffect(() => {
    getPendingRequests();
  }, []);

  const onViewOnMap = (selectedItem = {}) => {
    const {attrs = {}} = selectedItem;
    const {latitude, longitude} = attrs;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

  const handleCloseMap = () => {
    setSelectedLocation(null);
  };

  /**
   * Called when the user accepts the dialog box to approve the request.
   * @param requestToAccept
   * @returns {Promise<void>}
   */
  const handleAccept = async (requestToAccept) => {
    await acceptRequest(requestToAccept);
    handleCloseDialog();
    await onRefresh();
    navigation.navigate('activity');
  };

  /**
   * Called when the user accepts the dialog box to reject the request.
   * @param requestToCancel
   * @returns {Promise<void>}
   */
  const handleCancel = async (requestToCancel) => {
    await cancelRequest(requestToCancel);
    handleCloseDialog();
    await onRefresh();
  };

  /**
   * Enable the flags when the user wants to cancel (Reject) a service request.
   * @param selected
   */
  const handleSelectToCancel = (selected = null) => {
    setSelectedRequest(selected);
    setOpenConfirm(true);
    setRejecting(true);
  };

  /**
   * Enable the flags when the user wants to accept a service request.
   * @param selected
   */
  const handleSelectToApprove = (selected = null) => {
    setSelectedRequest(selected);
    setOpenConfirm(true);
    setApproving(true);
  };

  /**
   * Used to clear the flags when the dialog box must to disappear.
   */
  const handleCloseDialog = () => {
    setApproving(false);
    setRejecting(false);
    setSelectedRequest(null);
    setOpenConfirm(false);
  };

  const onView = (request) => {
    const {transition = {}} = request;
    if (startedStatuses.includes(transition.workflow)) {
      setKey('selectedToExecution', request);
      navigation.navigate('execution');
    } else {
      handleSelectItem(request);
    }
  };
  const onStart = async (request) => {
    await updateRequest(request);
    await onRefresh();
    setKey('selectedToExecution', request);
    navigation.navigate('execution');
  };

  useFocusEffect(
    useCallback(() => {
      if (openDetail) {
        onRefresh();
        setOpenDetail(false);
      }
      return () => {};
    }, [openDetail]),
  );

  return (
    <>
      {isTriko && <TrikoServicesFetcher />}
      {enableFilter && (
        <Filter
          filterPrimary={filterPrimary}
          currentFilter={currentFilter}
          onChange={(filter) =>
            onChangeFilter ? onChangeFilter(filter) : null
          }
          options={filters}
        />
      )}
      <Wrapper onRefresh={onRefresh}>
        {loading && <Loader />}
        {!loading && requests.length === 0 && <NoRequestItems />}
        {requests.map((item, key) => (
          <RequestCard
            block={totalRequests > 3}
            delay={100 * key}
            even={key % 2 === 0}
            expired={isExpired(item)}
            isTriko={isTriko}
            item={item}
            key={`request-${item.id}`}
            onSelect={handleSelectItem}
            onAccept={() => handleSelectToApprove(item)}
            onCancel={() => handleSelectToCancel(item)}
            userLocation={location}
            withStatus={withStatus}
            onViewOnMap={() => onViewOnMap(item)}
            onView={() => onView(item)}
            onStart={() => onStart(item)}
          />
        ))}
      </Wrapper>
      {loadingLocation && <LoadingCurtain />}
      {updatingRequest && <LoadingCurtain />}
      {openConfirm && !isEmpty(selectedRequest) && !updatingRequest && (
        <ConfirmMessage
          accepting={accepting}
          rejecting={rejecting}
          onAcceptRequest={handleAccept}
          onRejectRequest={handleCancel}
          request={selectedRequest}
          onClose={handleCloseDialog}
        />
      )}
      {Boolean(selectedLocation) && (
        <ViewOnMap
          open
          onClose={handleCloseMap}
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
        />
      )}
    </>
  );
};

MyActivityComponent.propTypes = {
  currentFilter: PropTypes.number, // Indicates which filter is selected.
  enableFilter: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.string), // ['label', 'label']
  isTriko: PropTypes.bool,
  onChangeFilter: PropTypes.func, // Function to control the active filter
  onlyPending: PropTypes.bool, // Display only services in pending state.
  onlyFavors: PropTypes.bool, // Display only services of type 3 (Favor)
  onlyCurrentDay: PropTypes.bool, // Display only services which apply for the current day.
  onlyMyServices: PropTypes.bool, // Display only services which I apply to
  noFinished: PropTypes.bool, // Display only services which I apply to
  filterPrimary: PropTypes.bool, // Controls  the filter button presentation.
  noCanceled: PropTypes.bool, // If hide canceled services.
  allTypes: PropTypes.bool, // If display all service types
  noRunning: PropTypes.bool, // If hide the running services
  withStatus: PropTypes.bool, // To show a status label
};

export default MyActivityComponent;
