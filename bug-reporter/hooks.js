import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {SEND_MESSAGE} from './queries';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

export const useSendSupportMessage = () => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(SEND_MESSAGE);
  const {
    stack: {regionId},
  } = useSession();
  const reportError = useErrorReporter({
    path: 'src/shared/components/bug-reporter/hooks.js',
  });
  const sendReport = async (payload = {}) => {
    const {email, phonenumber, description, fullName} = payload;
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          region: regionId,
          email,
          phone: phonenumber,
          message: description,
          fullName: isEmpty(fullName) ? 'Anonymous' : fullName,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e, {code: 'TK-000002'});
      setLoading(false);
    }
  };
  return {
    loading,
    sendReport,
  };
};
