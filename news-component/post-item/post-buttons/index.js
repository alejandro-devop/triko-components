import useStyles from 'shared/hooks/use-styles';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';
import React from 'react';
import styles from './styles';

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

export default PostButtons;
