import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import SuggestionItem from './SuggestionItem';
import useTranslation from 'shared/hooks/use-translate';

const SuggestionsList = ({items = [], onSelect}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {items.length === 0 && (
        <Text variant="caption" style={classes.caption}>
          {_t('no_market_places_to_list')}
        </Text>
      )}
      {items.map((item, key) => (
        <SuggestionItem
          key={`suggestion-${key}`}
          item={item}
          onPress={() => onSelect(item)}
        />
      ))}
    </View>
  );
};

const styles = () => ({
  caption: {
    textAlign: 'center',
    marginTop: 20,
  },
  root: {
    paddingHorizontal: 20,
  },
});

export default SuggestionsList;
