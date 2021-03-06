import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';
import trikoAvatar from 'shared/assets/avatars/triko-avatar.png';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Slide from 'shared/components/anims/Slide';

const ConfirmBubble = ({
  acceptLabel = 'accept_text',
  acceptIcon = 'check',
  cancelIcon = 'times',
  cancelLabel = 'cancel_text',
  onAccept,
  onCancel,
  message,
}) => {
  const [classes] = useStyles(styles);
  const [enable, setEnable] = useState(true);

  const handleClick = () => {
    setEnable(false);
    onAccept();
    setTimeout(() => {
      setEnable(true);
    }, 2000);
  };
  return (
    <Slide direction="left" style={classes.root}>
      <View style={classes.imageWrapper}>
        <PreImage style={classes.image} source={trikoAvatar} />
      </View>
      <View style={classes.content}>
        <Text style={classes.message}>{message}</Text>
      </View>
      <View style={classes.actions}>
        {onAccept && (
          <BorderedButton
            icon={acceptIcon}
            filled
            success
            disabled={!enable}
            label={acceptLabel}
            classes={{root: classes.buttonRoot, label: classes.label}}
            onPress={handleClick}
          />
        )}
        {onCancel && (
          <BorderedButton
            icon={cancelIcon}
            filled
            danger
            label={cancelLabel}
            onPress={onCancel}
            classes={{root: classes.buttonRoot, label: classes.label}}
          />
        )}
      </View>
    </Slide>
  );
};

export default ConfirmBubble;
