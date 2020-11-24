import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from 'hooks/index';
import InfoMessage from 'shared/components/messages/InfoMessage';
import Button from 'shared/components/base/buttons/button';
import {STATUS_CONFIRM_PAYMENT} from 'config/request-statuses';
import PreImage from "shared/components/base/pre-image";

const ConfirmPayment = ({onPaymentReceived, workflow, request}) => {
  const [classes] = useStyles(styles);
  const billScreenshots = 'https://designblog.uniandes.edu.co/blogs/dise2619/files/2014/01/ana_collazos.jpeg';

  return (
    <View style={classes.root}>
      {workflow !== STATUS_CONFIRM_PAYMENT && <InfoMessage text="waiting_for_client_to_upload_file" />}
      {workflow === STATUS_CONFIRM_PAYMENT && (
        <View>
          <View style={classes.billWrapper}>
            <PreImage style={classes.billImage} source={{uri: billScreenshots}} />
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
