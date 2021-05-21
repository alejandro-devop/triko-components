import React from 'react';
import {View} from 'react-native';
import Icon from 'components/base/icon';
import {useStyles} from '@triko-app/hooks';
import Text from 'components/base/text';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component only renders a temporary icon when there are not messages.
 * @author Jako <jakop.box@gmail.com>
 * @returns {*}
 * @constructor
 */
const EmptyIcon = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <View style={classes.iconWrapper}>
        <Icon name="comments" style={classes.icon} />
      </View>
      <Text style={classes.caption}>{_t('chat_empty_conversation')}</Text>
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    opacity: 0.4,
  },
  caption: {
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: 20,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: palette.grayLighter,
  },
  icon: {
    fontSize: 80,
  },
});

export default EmptyIcon;
