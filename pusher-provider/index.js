import React from 'react';
import PusherClient from 'helpers/PusherClient';
import useSession from 'hooks/useSession';

export const PusherContext = React.createContext(null);
const ContextProvider = PusherContext.Provider;
const client = new PusherClient();

/**
 * This provider allows to connect with the pusher client.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param children
 * @returns {*}
 * @constructor
 */
const PusherProvider = ({children}) => {
  const {
    stack: {user, token},
  } = useSession();
  client.initialize(user.id, token);
  return (
    <ContextProvider
      value={{
        client,
      }}>
      {children}
    </ContextProvider>
  );
};

export default PusherProvider;
