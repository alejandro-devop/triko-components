import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Platform, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Dialog from 'shared/components/dialogs/dialog';
import AddressItem from './AddressItem';
import Button from 'shared/components/base/buttons/button';
import ScrollContainer from 'shared/components/base/scroll-container';
import Text from 'shared/components/base/text';
import CircleButton from 'shared/components/base/buttons/circle-button';
import ListLoader from 'shared/components/loaders/list-loader';
import {GET_ADDRESSES} from 'shared/components/base/address-picker/queries';
import useSession from 'hooks/useSession';
import useTranslation from 'shared/hooks/use-translate';
import {useQuery} from '@apollo/react-hooks';

const screenHeight = Dimensions.get('window').height;

/**
 * This component wrappers the list of addresses
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param addresses
 * @param loading
 * @param open
 * @param onClose
 * @param onSelect
 * @param onSaveAddress
 * @param selected
 * @returns {*}
 * @constructor
 */
const AddressesList = ({
  open,
  onClose,
  onSelect,
  toggleForm,
  disableModal,
  selected = {},
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
  const content = (
    <>
      {loading && <ListLoader />}
      {!loading && (
        <ScrollContainer>
          {myAddresses.length === 0 && (
            <View style={classes.emptyWrapper}>
              <Text style={classes.emptyText} variant="caption">
                {_t('addresses_picker_empty_addresses_1')}
              </Text>
              <Text style={classes.emptyText} variant="caption">
                {_t('addresses_picker_empty_addresses_2')}
              </Text>
              <CircleButton name="plus" onPress={toggleForm} />
            </View>
          )}
          {myAddresses.length > 0 && (
            <>
              {myAddresses.map((item) => (
                <AddressItem
                  addressItem={item}
                  onPress={() => (onSelect ? onSelect(item) : null)}
                  key={`address-${item.id}`}
                  selected={selected.id === item.id}
                />
              ))}
              <View style={classes.buttonWrapper}>
                <Button primary onPress={toggleForm}>
                  {_t('address_picker_add_button')}
                </Button>
              </View>
            </>
          )}
        </ScrollContainer>
      )}
    </>
  );

  if (disableModal) {
    return content;
  }

  return (
    <Dialog
      contentStyles={classes.dialogContent}
      disableScroll
      title={_t('addresses_picker_title')}
      open={open}
      onClose={onClose}>
      {content}
    </Dialog>
  );
};

const styles = {
  root: {
    backgroundColor: '#FFF',
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  dialogContent: Platform.select({
    ios: {
      height: '90%',
      maxHeight: '90%',
    },
    android: {
      height: screenHeight - 20,
      maxHeight: screenHeight - 50,
    },
  }),
  emptyWrapper: {
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 20,
  },
};

AddressesList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.any,
      title: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  onSaveAddress: PropTypes.func,
  selected: PropTypes.object,
};

export default AddressesList;
