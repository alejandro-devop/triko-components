import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import SuggestionItem from './SuggestionItem';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';

const SuggestionsList = ({
  suggestions = [],
  onSelect,
  query = '',
  minChars,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {suggestions.map((item, key) => (
        <SuggestionItem
          key={`suggestion-${key}`}
          label={item.primaryText}
          onPress={() => (onSelect ? onSelect(item) : null)}
        />
      ))}
    </View>
  );
};

const styles = () => ({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

SuggestionsList.defaultProps = {
  minChars: 0,
};

export default SuggestionsList;
