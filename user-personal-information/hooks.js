import {useState} from 'react';
import {SAVE_PERSONAL_INFORMATION} from './queries';
import {useMutation} from '@apollo/react-hooks';
import useTranslation from 'shared/hooks/use-translate';
import useNotify from 'shared/hooks/use-notification';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import moment from 'moment';
import {useSession} from 'hooks/index';
import {LOCATION_STATE} from 'config/user-statuses';

/**
 * This hook handles the user personal information save.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param isTriko
 * @param updateWorkflow
 * @returns {{loading: *, sendRequest: *}}
 */
const usePISave = ({isTriko, updateWorkflow}) => {
  const [loading, setLoading] = useState();
  const {_t} = useTranslation();
  const {
    stack: {client = {}, triko = {}, locale, user = {}},
    setAll,
  } = useSession();
  const piID = isTriko ? triko.pi.id : client.pi.id;
  const {success, error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/user-personal-information/hooks.js',
  });
  const [savePersonalInfo] = useMutation(SAVE_PERSONAL_INFORMATION);

  const sendRequest = async (form = {}, onSuccess) => {
    setLoading(true);
    try {
      const {
        birthDate,
        firstName,
        lastName,
        gender,
        idType,
        city,
        identification,
      } = form;
      const formattedDate = moment(birthDate, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      );
      const {data = {}} = await savePersonalInfo({
        variables: {
          piID,
          idNumber: identification,
          city,
          idType,
          gender,
          firstName,
          lastName,
          birthDate: formattedDate,
          client: client.id,
          triko: triko.id,
          locale,
        },
      });

      const payload = isTriko
        ? {
            triko: {
              ...triko,
              pi: data.response,
            },
          }
        : {
            client: {
              ...client,
              pi: data.response,
            },
          };

      if (updateWorkflow) {
        payload.user = {
          ...user,
          workflow: LOCATION_STATE,
        };
      }
      await setAll(payload);
      setLoading(false);
      success(_t('personal_information_saved'));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setLoading(false);
      error('Error while saving personal information');
      reportError(e);
    }
  };

  return {
    loading,
    sendRequest,
  };
};

export default usePISave;
