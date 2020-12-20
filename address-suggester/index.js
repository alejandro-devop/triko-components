import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import TextField from 'shared/components/base/controls/text-field';
import useGetSuggestions from 'shared/components/address-suggester/useGetSuggestions';
import CircularLoader from 'components/base/loaders/CircularLoader';
import useStyles from 'shared/hooks/use-styles';
import SuggestionsList from './SuggestionsList';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';
import LinkButton from 'shared/components/base/buttons/link-button';
import {isEmpty} from 'shared/utils/functions';

const AddressSuggester = ({
  autoFocus,
  label,
  queryPrepend,
  onChange,
  onSearch,
  name,
  placeholder,
  value,
  noResultsOptionLabel,
  onNoResultsOption,
  minChars,
}) => {
  const [classes] = useStyles(styles);
  const [selected, setSelected] = useState(value);
  const [address, setAddress] = useState(value ? value.primaryText : '');
  const {_t} = useTranslation();
  const {suggestions, loading, getSuggestions} = useGetSuggestions({
    queryPrepend,
  });
  const onChangeQuery = async ({target: {value: newValue}}) => {
    setAddress(newValue);
    if (onSearch) {
      onSearch(!isEmpty(newValue) && newValue.length >= minChars); // If the query is empty searching is false
    }
    getSuggestions(newValue);
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

  useEffect(() => {
    setTimeout(() => {
      if (!isEmpty(value.primaryText)) {
        onChangeQuery({target: {value: value.primaryText}});
        setSelected(null);
      }
    }, 1000);
  }, []);
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
      {Boolean(address) &&
        address.length > minChars &&
        suggestions.length === 0 && (
          <View style={classes.emptySetWrapper}>
            <Text variant="caption">{_t('no_results_text')}</Text>
            {noResultsOptionLabel && (
              <LinkButton primary onPress={onNoResultsOption}>
                {_t(noResultsOptionLabel)}
              </LinkButton>
            )}
          </View>
        )}
      {!selected && (
        <SuggestionsList
          suggestions={suggestions}
          onSelect={onSelectAddress}
          query={address}
          minChars={minChars}
        />
      )}
    </>
  );
};

const styles = () => ({
  emptySetWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
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

AddressSuggester.defaultProps = {
  minChars: 4,
};

export default AddressSuggester;
