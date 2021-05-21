import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'components/base/icon';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';

const PostButtons = ({buttons = [], alt}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {buttons.map((item, key) => {
        const {icon} = item;
        return (
          <TouchableOpacity key={`item-${key}`} style={classes.button}>
            <Icon
              name={icon}
              style={classNames({icon: true, iconAlt: alt}, classes)}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = ({palette}) => ({
  button: {
    marginRight: 25,
  },
  icon: {
    color: palette.blue,
  },
  iconAlt: {
    color: '#FFF',
  },
  root: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default PostButtons;
