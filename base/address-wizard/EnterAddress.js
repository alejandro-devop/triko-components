import React, {useState} from 'react';
import {View} from 'react-native';
import AddressSuggester from 'shared/components/address-suggester';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'components/base/buttons/button';
import Options from './Options';
import {useStyles} from 'hooks/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddressMapPicker from 'shared/components/base/address-map-picker';

const EnterAddress = ({
  citySelected,
  defaultValue,
  mode,
  onChangeMode,
  onSelectAddress,
  onChangePosition,
  onGoBack,
  onAccept,
}) => {
  const {_t} = useTranslation();
  // Cl. 19 #2027
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

const styles = () => ({
  actions: {
    alignItems: 'center',
    marginTop: 30,
  },
  root: {
    paddingBottom: 200,
  },
});

EnterAddress.defaultProps = {
  mode: 0,
};

export default EnterAddress;
