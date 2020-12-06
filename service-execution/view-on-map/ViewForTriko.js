import React from 'react';
import {useSession} from 'hooks/index';
import MapRender from './MapRender';

const ViewForTriko = ({open, onClose, destination = {}, onDirectionReady}) => {
  const {
    stack: {currentLocation = {}, user = {}},
  } = useSession();
  const {photo_url: photo} = user;
  const {latitude, longitude, title} = destination;
  return (
    <MapRender
      open={open}
      onClose={onClose}
      onDirectionReady={onDirectionReady}
      title={title}
      origin={currentLocation}
      destination={{latitude, longitude}}
      photo={photo}
    />
  );
};

export default ViewForTriko;
