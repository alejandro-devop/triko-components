import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {GET_CLIENT_ADDRESSES, GET_TRIKO_ADDRESSES} from './queries';
import {useSession} from 'hooks/index';
import ListLoader from 'shared/components/loaders/list-loader';
import AddressItem from './addresses-item';
import useStyles from 'shared/hooks/use-styles';
import CircleButton from 'shared/components/base/buttons/circle-button';
import Label from 'shared/components/base/label';
import Text from 'shared/components/base/text';
import useTranslation from 'hooks/useTranslation';
import Button from 'components/base/buttons/button';
import styles from './styles';

/**
 * This component renders the user addresses list.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param addControl
 * @param addLabel
 * @param disableSelect
 * @param emptyLabel
 * @param enableAddButton
 * @param isTriko
 * @param onAddAddress
 * @param onSelectAddress
 * @param useWizard
 * @param useWizardLabel
 * @returns {*}
 * @constructor
 */
const MyAddressesList = ({
  addControl,
  addLabel,
  disableSelect,
  emptyLabel,
  enableAddButton = true,
  isTriko,
  onAddAddress,
  onSelectAddress,
  useWizard,
  useWizardLabel,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {
    stack: {client = {}, triko = {}, locale, myAddresses = []},
    setKey,
  } = useSession();
  const {loading} = useQuery(
    isTriko ? GET_TRIKO_ADDRESSES : GET_CLIENT_ADDRESSES,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({response}) => {
        setKey('myAddresses', response);
      },
      variables: isTriko
        ? {
            triko: triko.id,
            locale,
          }
        : {
            client: client.id,
            locale,
          },
    },
  );
  const addressesToList = Array.isArray(myAddresses) ? myAddresses : [];
  return (
    <View style={classes.root}>
      {loading && <ListLoader size="lg" />}
      {!loading && (
        <>
          {addressesToList.map((item, key) => (
            <AddressItem
              disableSelect={disableSelect}
              key={`my-address-${key}`}
              addressItem={item}
              onPress={() => onSelectAddress(item)}
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
  isTriko: PropTypes.bool,
  onAddAddress: PropTypes.func,
  onSelectAddress: PropTypes.func,
  useWizard: PropTypes.bool,
  useWizardLabel: PropTypes.string,
};

export default MyAddressesList;
