import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import {useStyles} from '@triko-app/hooks';

const RowItem = ({title, description, icon}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.iconWrapper}>
        <Icon name={icon} style={classes.icon} />
      </View>
      {Boolean(title) && (
        <Text variant="caption" style={classes.title}>
          {title}
        </Text>
      )}
      {Boolean(description) && <Text variant="caption">{description}</Text>}
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: palette.blueLight,
    marginBottom: 10,
    borderRadius: 20,
  },
  icon: {
    color: palette.blue,
  },
  iconWrapper: {
    marginRight: 10,
  },
  title: {
    flex: 1,
  },
});

export default RowItem;
