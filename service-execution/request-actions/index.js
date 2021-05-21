import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import FloatingButton from './FloatingButton';
import {
  STATUS_FINISHED,
  STATUS_PENDING,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_WAITING_FOR_CLIENT,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';

const RequestActions = ({onCancel, onReport, onOpenChat, workflow}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.wrapper}>
        {onCancel &&
          [STATUS_PENDING, STATUS_WAITING_FOR_TRIKO].includes(workflow) && (
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
        <FloatingButton
          disabled={[
            STATUS_FINISHED,
            STATUS_QUALIFY_CLIENT,
            STATUS_QUALIFY_TRIKO,
          ].includes(workflow)}
          icon="comment-dots"
          onPress={onOpenChat}
        />
      </View>
    </View>
  );
};

export default RequestActions;
