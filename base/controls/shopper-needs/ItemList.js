import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import useTranslation from 'shared/hooks/use-translate';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import LinkButton from 'shared/components/base/buttons/link-button';
import Item from './Item';

/**
 * This component renders the list of needs
 * @author Jako <jakop.box@gmail.com>
 * @param handleChange
 * @param items
 * @param labelKey
 * @param max
 * @param selected
 * @param toggleMore
 * @param valueKey
 * @returns {*}
 * @constructor
 */
const ItemList = ({
  handleChange,
  items,
  labelKey,
  max,
  selected,
  toggleMore,
  valueKey,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();

  const optionsToRender = useMemo(() => {
    if (max === false) {
      return items;
    }
    return items.slice(0, max);
  }, [items]);

  const otherOptions = max === false ? 0 : items.slice(max).length;
  return (
    <View style={classes.root}>
      {items.length === 0 && (
        <Text style={classes.caption} variant="caption">
          {_t('no_items_text')}
        </Text>
      )}
      <View style={classes.itemsWrapper}>
        {optionsToRender.map((item, key) => (
          <Item
            key={`item-key-${key}`}
            active={selected.includes(item[valueKey])}
            item={item}
            labelKey={labelKey}
            onPress={handleChange}
          />
        ))}
      </View>
      {otherOptions > 0 && (
        <View style={classes.moreWrapper}>
          <LinkButton
            primary
            disableUnderline
            style={classes.link}
            onPress={toggleMore}>
            {_t('view_more_text')}
          </LinkButton>
        </View>
      )}
    </View>
  );
};

const styles = () => ({
  caption: {
    textAlign: 'center',
    marginTop: 20,
  },
  itemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    textAlign: 'center',
  },
  moreWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
});

ItemList.defaultProps = {
  labelKey: 'name',
  max: 4,
  selected: [],
  valueKey: 'id',
};

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
