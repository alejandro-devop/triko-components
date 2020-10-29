import {GET_EVENTS} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import moment from 'moment';

/**
 * This hook fetches the triko calendar  events.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{refresh: *, loading: *, events: *}}
 */
export const useEventList = (options = {}) => {
  const {from, to} = options;
  const {
    stack: {triko = {}, locale},
  } = useSession();

  const monthStartDate = moment()
    .startOf('month')
    .format('YYYY-MM-DD' + ' 00:00:00');

  const monthEndDate =
    moment().endOf('month').format('YYYY-MM-DD') + ' 23:59:59';
  const {data = {}, loading, refetch} = useQuery(GET_EVENTS, {
    fetchPolicy: 'no-cache',
    variables: {
      triko: triko.id,
      from: from || monthStartDate,
      to: to || monthEndDate,
      locale,
    },
  });

  const refresh = async () => {
    await refetch();
  };

  const events = data.response ? data.response : [];
  return {
    events,
    loading,
    refresh,
  };
};
