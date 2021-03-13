import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'hooks/useStyles';
import Icon from 'components/base/icon';
import IconButton from 'components/base/buttons/icon-button';
import {getElapsedTime} from 'utils/functions';
import Slide from 'shared/components/anims/Slide';
import ImageIcon from 'components/ImageIcon';

/**
 * This component renders the notification presentation.
 * @author Jako <jakop.box@gmail.com>
 * @param notification
 * @param onSelect
 * @param onClose
 * @returns {*}
 * @constructor
 */
const NotificationItem = ({notification, onSelect, onClose}) => {
  const [classes] = useStyles(styles);
  const {avatar, title, message, icon, date} = notification;
  const elapsedTime = getElapsedTime(null, date);
  return (
    <Slide direction="right">
      <TouchableOpacity style={classes.root} onPress={onSelect}>
        <View style={classes.iconWrapper}>
          {avatar && (
            <View style={classes.avatarWrapper}>
              <ImageIcon
                source={{uri: avatar}}
                wrapperClass={classes.avatarCircle}
              />
            </View>
          )}
          {icon && (
            <View style={classes.iconCircle}>
              <Icon name={icon} style={classes.icon} />
            </View>
          )}
        </View>
        <View style={classes.contentWrapper}>
          <Text style={classes.title}>{title}</Text>
          <Text variant="caption" style={classes.message}>
            {message}
          </Text>
          <Text variant="caption">{elapsedTime}</Text>
        </View>
        <View style={classes.actionWrapper}>
          <IconButton name="times" onPress={onClose} />
        </View>
      </TouchableOpacity>
    </Slide>
  );
};

const styles = ({palette, shadows}) => ({
  root: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    ...shadows.shadow3,
  },
  avatarWrapper: {},
  avatarCircle: {
    borderRadius: 100,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  icon: {
    fontSize: 25,
  },
  iconCircle: {
    backgroundColor: palette.grayLighter,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  iconWrapper: {
    flex: 2,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 10,
  },
  actionWrapper: {
    justifyContent: 'center',
  },
});

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    avatar: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    icon: PropTypes.string,
    date: PropTypes.string,
  }),
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

export default NotificationItem;
