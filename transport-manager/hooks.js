import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_CONVEYANCES} from 'shared/components/base/controls/conveyance-picker/queries';
import {useSession} from 'hooks/index';
import {SAVE_PERSONAL_INFORMATION} from 'config/data/triko';
import useNotify from 'shared/hooks/use-notification';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This hook list the transport available for trikos.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{transports: *, loading: *}}
 */
export const useTransportsList = () => {
  const {
    stack: {locale},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_CONVEYANCES, {
    variables: {
      locale,
    },
  });
  const transports =
    data.response && Array.isArray(data.response) ? data.response : [];
  return {
    loading,
    transports,
  };
};

/**
 * This hook handles the transport save.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{loading: *, handleSaveTransport: *}}
 */
export const useSaveTransport = () => {
  const {
    stack: {locale, triko},
    setKey,
  } = useSession();
  const {error} = useNotify();
  const {_t} = useTranslation();

  const reportError = useErrorReporter({
    path: 'src/main/components/transport-manager/hooks.js',
  });

  const [savePersonalInformation, {loading}] = useMutation(
    SAVE_PERSONAL_INFORMATION,
  );

  /**
   * This function calls the  mutation to save the transport.
   * @param params
   * @returns {Promise<void>}
   */
  const handleSaveTransport = async (params = {}) => {
    const {selected, onSaved} = params;
    try {
      const {data = {}} = await savePersonalInformation({
        variables: {
          locale,
          piID: triko.pi.id,
          triko: triko.id,
          transportType: JSON.stringify(selected),
        },
      });

      if (data.response && data.response.id) {
        const {transports: newTransports} = data.response.triko;
        // After the transport is saved we update the triko transports in session.
        setKey('triko', {
          ...triko,
          transports: newTransports,
        });
      }

      if (onSaved) {
        onSaved();
      }
    } catch (e) {
      error(_t('Error While updating transport'));
      reportError(e);
    }
  };

  return {
    handleSaveTransport,
    loading,
  };
};
