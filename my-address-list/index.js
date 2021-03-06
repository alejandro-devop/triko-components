import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import ScrollView from 'shared/components/commons/scrollview';
import {useQuery} from '@apollo/react-hooks';
import {GET_CLIENT_ADDRESSES, GET_TRIKO_ADDRESSES} from './queries';
import {useSession} from 'hooks/index';
import ListLoader from 'shared/components/loaders/list-loader';
import AddressItem from './addresses-item';
import {useStyles} from '@triko-app/hooks';
import CircleButton from 'shared/components/base/buttons/circle-button';
import Label from 'shared/components/base/label';
import Text from 'shared/components/base/text';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'components/base/buttons/button';
import Dialog from 'shared/components/dialogs/dialog';
import styles from './styles';
import useAddressRemove from 'shared/components/my-address-list/hooks';
import {LoadingCurtain} from 'components/base/dialogs';

/**
 * This component renders the user addresses list.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param addControl
 * @param addLabel
 * @param disableRemove
 * @param disableSelect
 * @param emptyLabel
 * @param enableAddButton
 * @param enableEdit
 * @param isTriko
 * @param onAddAddress
 * @param onEdit
 * @param onSelectAddress
 * @param useWizard
 * @param useWizardLabel
 * @param useDialog
 * @param open
 * @param onClose
 * @returns {*}
 * @constructor
 */
const MyAddressesList = ({
  addControl,
  addLabel,
  disableRemove,
  disableSelect,
  emptyLabel,
  enableEdit,
  onEdit,
  enableAddButton = true,
  isTriko,
  open,
  onClose,
  onAddAddress,
  onSelectAddress,
  useWizard,
  useWizardLabel,
  useDialog,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {
    stack: {client = {}, triko = {}, locale, myAddresses = []},
    setKey,
  } = useSession();
  const {removeAddress, loading: removing} = useAddressRemove();
  const variables = isTriko
    ? {
        triko: triko.id,
        locale,
      }
    : {
        client: client.id,
        locale,
      };
  const {loading, refetch} = useQuery(
    isTriko ? GET_TRIKO_ADDRESSES : GET_CLIENT_ADDRESSES,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({response}) => {
        setKey('myAddresses', response);
      },
      variables,
    },
  );

  const refresh = async () => {
    await refetch(variables);
  };

  const handleRemoveAddress = async ({id}) => {
    await removeAddress(id);
    await setKey(
      'myAddresses',
      myAddresses.filter((item) => item.id !== id),
    );
  };

  const handleEditAddress = (item) => {
    if (onEdit) {
      onEdit(item);
    }
  };

  const addressesToList = Array.isArray(myAddresses) ? myAddresses : [];
  const content = (
    <View style={classes.root}>
      {removing && <LoadingCurtain />}
      {loading && <ListLoader size="lg" />}
      {!loading && (
        <>
          {addressesToList.map((item, key) => (
            <AddressItem
              disableSelect={disableSelect}
              disableRemove={disableRemove}
              key={`my-address-${key}`}
              addressItem={item}
              enableEdit={enableEdit}
              onPress={() => onSelectAddress(item)}
              onRemove={() => handleRemoveAddress(item)}
              onEdit={() => handleEditAddress(item)}
            />
          ))}
          {addressesToList.length === 0 && (
            <View style={classes.emptyLabel}>
              <Text variant="caption">{_t(emptyLabel)}</Text>
            </View>
          )}
        </>
      )}

      {!loading && enableAddButton && (
        <View style={classes.actions}>
          <Label>{_t(addLabel)}</Label>
          <CircleButton primary name="plus" size="lg" onPress={onAddAddress} />
        </View>
      )}
      {addControl}
      {useWizard && (
        <View style={classes.actions}>
          <Button secondary onPress={onAddAddress} style={classes.otherButton}>
            {_t(
              useWizardLabel ||
                (myAddresses.length === 0
                  ? 'add_address'
                  : 'other_address_text'),
            )}
          </Button>
        </View>
      )}
    </View>
  );
  if (useDialog) {
    return (
      <Dialog
        open={open}
        disableScroll
        onClose={onClose}
        contentStyles={classes.dialog}>
        <ScrollView>{content}</ScrollView>
      </Dialog>
    );
  }
  return content;
};

MyAddressesList.defaultProps = {
  addLabel: 'add_address_service',
  emptyLabel: 'empty_addresses_label',
};

MyAddressesList.propTypes = {
  addControl: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]),
  addLabel: PropTypes.string,
  disableSelect: PropTypes.bool,
  emptyLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  enableAddButton: PropTypes.bool,
  enableEdit: PropTypes.bool,
  isTriko: PropTypes.bool,
  onEdit: PropTypes.bool,
  onAddAddress: PropTypes.func,
  onSelectAddress: PropTypes.func,
  useWizard: PropTypes.bool,
  useWizardLabel: PropTypes.string,
};

export default MyAddressesList;
