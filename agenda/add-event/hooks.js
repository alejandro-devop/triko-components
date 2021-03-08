import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useMutation} from '@apollo/react-hooks';
import {SAVE_EVENT} from '../queries';
import useNotify from 'shared/hooks/use-notification';
import moment from 'moment';
import useRegionConfig from 'shared/hooks/use-regional-config';
import {useSession} from 'hooks/index';
import {isEmpty} from 'utils/functions';

/**
 * This hook returns a function to save a new event.
 * It calls the mutation, reports error and handles the loading state
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{saveEvent: function, loading: boolean}}
 */
export const useEventSave = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(SAVE_EVENT);
  const {
    stack: {triko = {}, locale},
  } = useSession();
  const {dayStartsAt, dayEndsAt} = useRegionConfig();
  const {error, success} = useNotify();

  const reportError = useErrorReporter({
    path: 'src/shared/components/agenda/add-event/hooks.js',
  });

  /**
   * This function saves a new triko event.
   * @param form
   * @returns {Promise<boolean>}
   */
  const saveEvent = async (form = {}) => {
    const {allDay, day, ends, eventId, starts, title} = form;
    setLoading(true);
    const parseTime = (time) => {
      const formattedTime = moment(time, 'hh:mm:ss a');
      return `${day} ${formattedTime.format('HH:mm:ss')}`;
    };
    try {
      await sendRequest({
        variables: {
          eventId: eventId,
          triko: triko.id,
          locale,
          event: JSON.stringify({
            start: parseTime(starts || dayStartsAt),
            end: parseTime(ends || dayEndsAt),
            title,
          }),
          attrs: JSON.stringify({
            allDay,
          }),
        },
      });

      setLoading(false);
      success('event_save_success');

      return true;
    } catch (e) {
      reportError(e);
      error('event_save_error');
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    saveEvent,
  };
};
