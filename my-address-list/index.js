import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {GET_ADDRESSES} from 'components/base/address-picker/queries';
import {useSession} from 'hooks/index';
import ListLoader from 'shared/components/loaders/list-loader';
import AddressItem from './AddressItem';
import useStyles from 'shared/hooks/use-styles';
import CircleButton from 'shared/components/base/buttons/circle-button';
import Label from 'shared/components/base/label';
import Text from 'shared/components/base/text';
import useTranslation from 'hooks/useTranslation';

const MyAddressesList = ({
  addLabel,
  emptyLabel,
  enableAddButton = true,
  onAddAddress,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {
    stack: {client = {}, locale, myAddresses = []},
    setKey,
  } = useSession();
  const {loading} = useQuery(GET_ADDRESSES, {
    fetchPolicy: 'no-cache',
    onCompleted: ({response}) => {
      setKey('myAddresses', response);
    },
    variables: {
      client: client.id,
      locale,
    },
  });
  return (
    <View style={classes.root}>
      {loading && <ListLoader size="lg" />}
      {!loading && (
        <>
          {myAddresses.map((item, key) => (
            <AddressItem key={`my-address-${key}`} addressItem={item} />
          ))}
          {myAddresses.length === 0 && (
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
    </View>
  );
};

const styles = () => ({
  root: {
    flex: 1,
  },
  emptyLabel: {
    alignItems: 'center',
    marginBottom: 40,
  },
  actions: {},
});

MyAddressesList.defaultProps = {
  addLabel: 'add_address_service',
  emptyLabel: 'empty_addresses_label',
};

export default MyAddressesList;
