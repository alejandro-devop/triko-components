import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import SuggestionItem from './SuggestionItem';

const SuggestionsList = ({suggestions = [], onSelect}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {suggestions.map((item, key) => (
        <SuggestionItem
          key={`suggestion-${key}`}
          label={item.primaryText}
          description={item.secondaryText}
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
