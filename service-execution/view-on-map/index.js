import React from 'react';
import ViewForTriko from 'shared/components/service-execution/view-on-map/ViewForTriko';
import ViewForClient from 'shared/components/service-execution/view-on-map/ViewForClient';

const ViewOnMap = ({
  open,
  onClose,
  destination = {},
  onDirectionReady,
  isTriko,
  request,
}) => {
  const Component = isTriko ? ViewForTriko : ViewForClient;
  return (
    <Component
      open={open}
      onClose={onClose}
      destination={destination}
      onDirectionReady={onDirectionReady}
      request={request}
    />
  );
};

export default ViewOnMap;
