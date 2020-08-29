import React, {useState} from 'react';
import {View} from 'react-native';
import AddressSuggester from 'shared/components/address-suggester';
import useTranslation from 'hooks/useTranslation';
import Button from 'components/base/buttons/button';
import Options from './Options';
import {useStyles} from 'hooks/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EnterAddress = ({
  citySelected,
  mode,
  onChangeMode,
  onSelectAddress,
  onGoBack,
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
            value={selected}
          />
        )}
        <View style={classes.actions}>
          <Button onPress={onGoBack}>{_t('back_text')}</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = () => ({
  actions: {
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
