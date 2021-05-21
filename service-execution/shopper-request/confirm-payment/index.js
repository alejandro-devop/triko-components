import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import InfoMessage from 'shared/components/messages/InfoMessage';
import Button from 'shared/components/base/buttons/button';
import {
  STATUS_CONFIRM_PAYMENT,
  STATUS_PAYING_ORDER,
} from 'config/request-statuses';
import PreImage from 'shared/components/base/pre-image';
import {isEmpty} from 'shared/utils/functions';

const ConfirmPayment = ({onPaymentReceived, workflow, request = {}}) => {
  const [classes] = useStyles(styles);
  const {images = []} = request;
  const [, clientImage] = images;

  return (
    <View style={classes.root}>
      {isEmpty(clientImage) &&
        [STATUS_CONFIRM_PAYMENT, STATUS_PAYING_ORDER].includes(workflow) && (
          <InfoMessage text="waiting_for_client_to_upload_file" />
        )}
      {workflow === STATUS_CONFIRM_PAYMENT && !isEmpty(clientImage) && (
        <View>
          <View style={classes.billWrapper}>
            <PreImage
              style={classes.billImage}
              source={{uri: clientImage.url}}
            />
          </View>
          <View style={classes.actions}>
            <Button onPress={onPaymentReceived} primary>
              confirm_payment_received
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default ConfirmPayment;
