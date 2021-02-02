import useStyles from 'shared/hooks/use-styles';
import {TouchableOpacity, View} from 'react-native';
import Text from 'shared/components/base/text';
import Icon from 'shared/components/base/icon';
import classNames from 'shared/utils/classnames';
import React from 'react';
import styles from './styles';

const PostButtons = ({buttons = [], comments, alt, pre}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {pre}
      {buttons.map((item, key) => {
        const {icon, action, count} = item;
        const Wrapper = action ? TouchableOpacity : View;
        return (
          <Wrapper key={`item-${key}`} style={classes.button} onPress={action}>
            <Icon
              name={icon}
              style={classNames({icon: true, iconAlt: alt}, classes)}
            />
            {count > 0 && (
              <View style={classes.badge}>
                <Text style={classes.badgeText}>{count}</Text>
              </View>
            )}
          </Wrapper>
        );
      })}
    </View>
  );
};

export default PostButtons;
