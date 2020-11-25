import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';
import useTranslation from 'hooks/useTranslation';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import Item from './Item';

/**
 * This component renders the list of needs
 * @author Jako <jakop.box@gmail.com>
 * @param handleChange
 * @param items
 * @param labelKey
 * @param selected
 * @param valueKey
 * @returns {*}
 * @constructor
 */
const ItemList = ({
  handleChange,
  items,
  labelKey,
  selected,
  valueKey = 'id',
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {items.length === 0 && (
        <Text style={classes.caption} variant="caption">
          {_t('no_items_text')}
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, key) => (
          <Item
            key={`item-key-${key}`}
            active={selected.includes(item[valueKey])}
            item={item}
            labelKey={labelKey}
            onPress={handleChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = () => ({
  caption: {
    textAlign: 'center',
    marginTop: 20,
  },
  root: {
    marginVertical: 5,
  },
});

ItemList.defaultProps = {};

ItemList.propTypes = {
  handleChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.any,
    }),
  ),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  toggleMore: PropTypes.func,
  selected: PropTypes.array,
};

export default ItemList;
