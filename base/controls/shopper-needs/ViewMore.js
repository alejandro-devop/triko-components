import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import ItemList from './ItemList';
import {useStyles} from '@triko-app/hooks';
import CircleButton from 'shared/components/base/buttons/circle-button';

/**
 * This component allows to render more options for the list item.
 * @author Jako <jakop.box@gmail.com>
 * @param items
 * @param onClose
 * @param onDone
 * @param open
 * @param handleChange
 * @param selected
 * @param title
 * @returns {*}
 * @constructor
 */
const ViewMore = ({
  items,
  onClose,
  onDone,
  open,
  handleChange,
  selected,
  title,
}) => {
  const [classes] = useStyles(styles);
  return (
    <Dialog
      onClose={onClose}
      open={open}
      contentStyles={classes.root}
      disableScroll
      title={title}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemList
          items={items}
          max={false}
          handleChange={handleChange}
          selected={selected}
        />
      </ScrollView>
      {selected.length > 0 && (
        <View style={classes.actions}>
          <CircleButton onPress={onDone} name="check" primary size="lg" />
        </View>
      )}
    </Dialog>
  );
};

const styles = () => ({
  actions: {
    marginTop: 10,
  },
  root: {
    maxHeight: '80%',
    height: '80%',
  },
});

ViewMore.defaultProps = {
  selected: [],
  items: [],
};

ViewMore.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      name: PropTypes.string,
    }),
  ),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  handleChange: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string,
};

export default ViewMore;
