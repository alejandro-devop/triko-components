import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'components/base/text';
import {
  STATUS_ACCEPTED,
  STATUS_PAYMENT,
  STATUS_PENDING,
} from 'config/request-statuses';
import Button from 'shared/components/base/buttons/button';
import {startedStatuses} from 'shared/hooks/use-request-status';
import StatusCard from '../status-card';

/**
 * This component allows to render the current cart actions
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param alternative
 * @param onAccept
 * @param onView
 * @param onCancel
 * @param onStart
 * @param workflow
 * @returns {*}
 * @constructor
 */
const CardActions = ({
  alternative,
  onAccept,
  onView,
  onStart,
  onCancel,
  workflow,
  withStatus,
  isPaid,
}) => {
  const [classes] = useStyles(styles);
  return (
    <>
      <View style={classes.root}>
        {workflow === STATUS_PENDING && (
          <>
            <View style={[classes.buttonWrapper, classes.buttonWrapperFirst]}>
              <BorderedButton onPress={onAccept} icon="check" success />
              <Text style={classes.label}>accept_text</Text>
            </View>
            <View style={classes.buttonWrapper}>
              <BorderedButton danger icon="times" onPress={onCancel} />
              <Text style={classes.label}>reject_text</Text>
            </View>
          </>
        )}
        {!withStatus && workflow === STATUS_ACCEPTED && !alternative && (
          <View style={[classes.buttonWrapper, classes.buttonWrapperFirst]}>
            <BorderedButton onPress={onView} icon="eye" />
            <Text style={classes.label}>view_text</Text>
          </View>
        )}
        {withStatus && (
          <View style={classes.statusWrapper}>
            {/*<StatusCard isPaid={isPaid} workflow={workflow} />*/}
            {workflow === STATUS_PAYMENT && isPaid && (
              <View style={classes.paidInfoWrapper}>
                <View>
                  <Button
                    alternative
                    size="xxs"
                    textStyle={classes.altButton}
                    onPress={onStart}>
                    start_text
                  </Button>
                </View>
                <View style={classes.paidTextWrapper}>
                  <Text style={[classes.text]}>
                    service_request_congrats_paid_message
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default CardActions;
