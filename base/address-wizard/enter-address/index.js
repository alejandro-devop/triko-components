import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import AddressSuggester from 'shared/components/address-suggester';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'components/base/buttons/button';
import Options from '../options';
import {useStyles} from '@triko-app/hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddressMapPicker from 'shared/components/base/address-map-picker';

/**
 * This component allows the user to type his current location
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param citySelected
 * @param defaultValue
 * @param mode
 * @param onAccept
 * @param onChangeMode
 * @param onChangePosition
 * @param onGoBack
 * @param onSelectAddress
 * @returns {*}
 * @constructor
 */
const EnterAddress = ({
  citySelected,
  defaultValue,
  mode,
  onAccept,
  onChangeMode,
  onChangePosition,
  onGoBack,
  onSelectAddress,
}) => {
  const {_t} = useTranslation();
  const [selected, setSelected] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);
  const [classes] = useStyles(styles);
  const handleSelect = ({target: {value}}) => {
    setSelected(value);
    if (onSelectAddress && value) {
      const {primaryText} = value;
      onSelectAddress({
        address: primaryText,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <View style={classes.root}>
        {!isSearching && (
          <Options value={mode} onChange={(newMode) => onChangeMode(newMode)} />
        )}
        {mode === 0 && (
          <AddressSuggester
            onSearch={(searching) => setIsSearching(searching)}
            onChange={handleSelect}
            label={_t('type_your_address_label')}
            placeholder={_t('address_example_placeholder')}
            queryPrepend={citySelected}
            noResultsOptionLabel={'no_results_found_address'}
            onNoResultsOption={() => onChangeMode(1)}
            value={selected}
          />
        )}
        {mode === 1 && <AddressMapPicker onChange={onChangePosition} />}
        <View style={classes.actions}>
          {mode === 1 && (
            <Button primary onPress={onAccept}>
              {_t('accept_text')}
            </Button>
          )}
          <Button secondary onPress={onGoBack}>
            {_t('back_text')}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

EnterAddress.defaultProps = {
  mode: 0,
};

EnterAddress.propTypes = {
  citySelected: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  mode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Whether the user selects to type the address (0) or select from map (1)
  onAccept: PropTypes.func, // Function triggered when the user accepts the selected address
  onChangeMode: PropTypes.func, // Function triggered when the mode has been changed
  onChangePosition: PropTypes.func, // Function triggered when the user changes the map marker location
  onGoBack: PropTypes.func, // Function triggered when the user press the back or cancel button.
  onSelectAddress: PropTypes.func, // Function triggered when the user select an address from the suggestions.
};

export default EnterAddress;
