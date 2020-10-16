import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';

/**
 * This component renders the empty text when there are no items.
 * @returns {*}
 * @constructor
 */
const EmptyList = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <Text style={classes.text} variant="caption">
        {_t('no_notifications_items')}
      </Text>
    </View>
  );
};

const styles = () => ({
  root: {
    paddingHorizontal: 60,
  },
  text: {
    textAlign: 'center',
  },
});

export default EmptyList;
