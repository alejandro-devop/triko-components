import React, {useState} from 'react';
import Dialog from 'components/base/dialogs/dialog';
import MyTransportsList from '../my-transport-list';
import {useStyles} from '@triko-app/hooks';
import useTranslation from 'shared/hooks/use-translate';
import useNotify from 'shared/hooks/use-notification';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {UPDATE_TRANSPORTS} from '../queries';
import useSession from 'hooks/useSession';
import AddList from '../add-list';
import {GET_TRIKO} from 'config/queries/trikos';
import InfoMessage from 'components/base/messages/InfoMessage';

/**
 * This component allows to manage the user transport types.
 * @author Jako <jakop.box@gmail.com>
 * @param open
 * @param onClose
 * @returns {*}
 * @constructor
 */
const TransportsDialog = ({open, onClose}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {triko = {}, locale},
    setKey,
  } = useSession();
  const {_t} = useTranslation();
  const {error} = useNotify();
  const [visibleAdd, setVisibleAdd] = useState(false);
  useQuery(GET_TRIKO, {
    variables: {
      id: triko.id,
      locale,
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({response}) => {
      if (response.transports) {
        setKey('triko', {
          ...triko,
          transports: response.transports,
        });
      }
    },
  });

  const [updateTransport, {loading}] = useMutation(UPDATE_TRANSPORTS);
  const toggleAdd = () => setVisibleAdd(!visibleAdd);
  const onSelectDefault = async ({type = {}}) => {
    try {
      const {data = {}} = await updateTransport({
        variables: {
          id: type.id,
          triko: triko.id,
          isDefault: 1,
        },
      });
      if (data.response.id) {
        setKey('triko', {
          ...triko,
          transports: triko.transports.map((item) => {
            if (item.type.id === type.id) {
              item.type.isDefault = 1;
            } else {
              item.type.isDefault = 0;
            }
            return item;
          }),
        });
      } else {
        error(_t('Error while updating the transport'));
      }
    } catch (e) {
      error(_t('Error while updating transport'));
    }
  };
  const defaultTransport = triko.transports
    ? triko.transports.find((item) => item.isDefault)
    : null;
  return (
    <Dialog
      title={_t('transport_manager_title')}
      loading={loading}
      open={open}
      onClose={onClose}
      disableScroll
      contentStyles={classes.root}>
      {!defaultTransport && <InfoMessage text={_t('transport_type_help')} />}
      {!visibleAdd && (
        <MyTransportsList
          onSelectTransport={onSelectDefault}
          toggleAdd={toggleAdd}
        />
      )}
      {visibleAdd && <AddList toggleAdd={toggleAdd} />}
    </Dialog>
  );
};

const styles = {
  root: {
    height: '80%',
  },
};

export default TransportsDialog;
