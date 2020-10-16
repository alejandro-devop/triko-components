import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import Text from 'components/base/text';
import Icon from 'components/base/icon';
import {getElapsedTime} from 'utils/functions';
import IconButton from 'shared/components/base/buttons/icon-button';
import Slide from 'shared/components/anims/Slide';
import useNotifyUpdate from '../useNotifyUpdate';

/**
 * This component renders the single notification item.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param delay
 * @param notification
 * @param onNotifyUpdated
 * @returns {*}
 * @constructor
 */
const NotificationCard = ({delay = 0, notification = {}, onNotifyUpdated}) => {
  const [classes] = useStyles(styles);
  const {loading, updateNotify} = useNotifyUpdate();
  const {id, created_at: createdDate, message, title} = notification;
  const elapsed = getElapsedTime(createdDate);
  const onMarkAsViewed = async () => {
    await updateNotify(
      {
        id,
        title,
        message,
        viewed: true,
      },
      () => {
        if (onNotifyUpdated) {
          onNotifyUpdated();
        }
      },
    );
  };
  return (
    <Slide delay={delay} style={classes.root}>
      <View style={classes.iconWrapper}>
        <Icon name="bell" from="fw4" style={classes.icon} />
      </View>
      <View style={classes.textWrapper}>
        {title && <Text style={[classes.title, classes.text]}>{title}</Text>}
        {elapsed && (
          <Text style={[classes.title, classes.text]}>{elapsed}</Text>
        )}
        {message && <Text style={[classes.message]}>{message}</Text>}
      </View>
      <View style={classes.actionWrapper}>
        <IconButton
          disabled={loading}
          name="eye"
          iconStyles={classes.actionIcon}
          onPress={onMarkAsViewed}
        />
      </View>
    </Slide>
  );
};

export default NotificationCard;
