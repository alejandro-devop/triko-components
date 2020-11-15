import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import FloatingButton from './FloatingButton';

const RequestActions = ({onCancel, onReport, onOpenChat}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.wrapper}>
        {onCancel && (
          <BorderedButton
            icon="times"
            danger
            label="cancel_text"
            size="sm"
            onPress={onCancel}
          />
        )}
        {onReport && (
          <BorderedButton
            icon="exclamation-triangle"
            warning
            label="cancel_text"
            size="sm"
          />
        )}
      </View>
      <View style={classes.floatingActions}>
        <FloatingButton icon="comment-dots" onPress={onOpenChat} />
      </View>
    </View>
  );
};

export default RequestActions;
