import React, {useState, useRef} from 'react';

export const NotificationsContext = React.createContext();
export const ContextProvider = NotificationsContext.Provider;
export const ContextConsumer = NotificationsContext.Consumer;

const NotificationsProvider = ({children}) => {
  const [subscriptions, setSubscriptions] = useState({});

  const subscribeToEvent = (key, event) => {
    setSubscriptions({
      ...subscriptions,
      [key]: event,
    });
  };

  const unsubscribeEvent = (key) => {
    const newEvents = {...subscriptions};
    delete newEvents[key];
    setSubscriptions(newEvents);
  };

  const onEventReceived = (eventInfo = {}) => {
    const {data = {}} = eventInfo;
    const {type} = data;
    if (subscriptions[type]) {
      subscriptions[type](eventInfo);
    }
  };

  return (
    <ContextProvider
      value={{
        subscriptions,
        onEventReceived,
        subscribeToEvent,
        unsubscribeEvent,
      }}>
      {children}
    </ContextProvider>
  );
};

export default NotificationsProvider;
