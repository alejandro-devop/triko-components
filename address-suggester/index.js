import React, {useState} from 'react';
import {View} from 'react-native';
import TextField from 'shared/components/base/controls/text-field';
import useGetSuggestions from 'shared/components/address-suggester/useGetSuggestions';
import CircularLoader from 'components/base/loaders/CircularLoader';
import useStyles from 'shared/hooks/use-styles';
import SuggestionsList from './SuggestionsList';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';

const AddressSuggester = ({
  autoFocus,
  label,
  queryPrepend,
  onChange,
  name,
  placeholder,
  value,
}) => {
  const [classes] = useStyles(styles);
  const [selected, setSelected] = useState(value);
  const [address, setAddress] = useState(value ? value.primaryText : null);
  const {_t} = useTranslation();
  const {suggestions, loading, getSuggestions} = useGetSuggestions({
    queryPrepend,
  });
  const onChangeQuery = async ({target: {value}}) => {
    setAddress(value);
    getSuggestions(value);
  };

  const onSelectAddress = (address = {}) => {
    setSelected(address);
    setAddress(address.primaryText);
    if (onChange) {
      onChange({
        target: {
          name,
          value: address,
        },
      });
    }
  };
  const onRemove = () => {
    setSelected(null);
    if (onChange) {
      onChange({
        target: {
          name,
          value: null,
        },
      });
    }
  };

  return (
    <>
      <TextField
        autoFocus={autoFocus}
        label={label}
        placeholder={placeholder}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            onRemove();
          }
        }}
        primary
        onChange={onChangeQuery}
        value={address}
      />
      {loading && (
        <View style={classes.loaderWrapper}>
          <CircularLoader />
        </View>
      )}
      {!loading && suggestions.length > 0 && (
        <View style={classes.suggestionsPH}>
          <Text variant="caption">{_t('select_matching_address_text')}</Text>
        </View>
      )}
      {!selected && (
        <SuggestionsList suggestions={suggestions} onSelect={onSelectAddress} />
      )}
    </>
  );
};

const styles = () => ({
  loaderWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  suggestionsPH: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AddressSuggester;
