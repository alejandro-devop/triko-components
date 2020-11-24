import React from 'react';
import {useSession} from 'hooks/index';
import MapRender from './MapRender';

const ViewForTriko = ({
  open,
  onClose,
  destination = {},
  onDirectionReady,
  request = {},
}) => {
  const {
    stack: {currentLocation = {}, user = {}},
  } = useSession();
  const {address} = request;
  const {photo_url: photo} = user;
  const {latitude, longitude} = destination;
  return (
    <MapRender
      open={open}
      onClose={onClose}
      onDirectionReady={onDirectionReady}
      title={address}
      origin={currentLocation}
      destination={{latitude, longitude}}
      photo={photo}
    />
  );
};

export default ViewForTriko;
