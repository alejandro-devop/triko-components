import React, {useState} from 'react';
import {View} from 'react-native';
import AddressSuggester from 'shared/components/address-suggester';
import useTranslation from 'hooks/useTranslation';
import Button from 'components/base/buttons/button';
import Options from './Options';
import {useStyles} from 'hooks/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AddressMapPicker from 'shared/components/base/address-map-picker';

const EnterAddress = ({
  citySelected,
  mode,
  onChangeMode,
  onSelectAddress,
  onChangePosition,
  onGoBack,
  onAccept,
}) => {
  const {_t} = useTranslation();
  const [selected, setSelected] = useState(null);
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
        <Options value={mode} onChange={newMode => onChangeMode(newMode)} />
        {mode === 0 && (
          <AddressSuggester
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
