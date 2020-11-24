import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import InfoMessage from 'shared/components/messages/InfoMessage';
import Button from 'shared/components/base/buttons/button';
import {STATUS_CONFIRM_PAYMENT} from 'config/request-statuses';

const ConfirmPayment = ({onPaymentReceived, workflow}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <InfoMessage text="waiting_for_client_to_upload_file" />
      {workflow === STATUS_CONFIRM_PAYMENT && (
        <View style={classes.actions}>
          <Button onPress={onPaymentReceived} primary>
            confirm_payment_received
          </Button>
        </View>
      )}
    </View>
  );
};

export default ConfirmPayment;
