import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import {useStyles} from 'hooks';

const RowItem = ({content, icon}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.iconWrapper}>
        <Icon name={icon} />
      </View>
      <View style={classes.textWrapper}>
        <Text variant="caption">{content}</Text>
      </View>
    </View>
  );
};

const styles = {
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  iconWrapper: {
    flex: 1,
    marginRight: 10,
  },
  textWrapper: {
    flex: 11,
    marginRight: 10,
  },
};

export default RowItem;
