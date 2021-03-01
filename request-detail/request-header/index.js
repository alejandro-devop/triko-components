import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import TrikoInfo from '../triko-info';
import Text from 'components/base/text';
import Slide from 'shared/components/anims/Slide';
import RequestStatus from '../request-status';
import PreImage from 'shared/components/base/pre-image';
import styles from './styles';
import useRequestStatus from 'shared/hooks/use-request-status';
import {isEmpty} from 'shared/utils/functions';
import ExpiredLabel from 'shared/components/requests-list/expired-label';
import {
  STATUS_ACCEPTED,
  STATUS_PAYMENT,
  STATUS_PENDING,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';

const RequestHeader = ({
  disableStatus,
  hideTrikoInfo,
  paidOut,
  isExpired,
  request = {},
}) => {
  const [classes] = useStyles(styles);
  const {triko: trikos = [], details = [], transition = {}} = request;
  const [triko = {}] = trikos;
  const {service = {}} = details && details.length > 0 ? details[0] : [];
  const workflow = transition.workflow;
  const statusText = useRequestStatus(workflow, true, paidOut);

  if (isEmpty(request) || isEmpty(request.id)) {
    return null;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Slide direction="top" style={classes.animWrapper}>
        <SafeAreaView style={classes.root}>
          <View style={classes.content}>
            <View style={classes.serviceWrapper}>
              <View style={classes.iconWrapper}>
                <PreImage
                  style={classes.icon}
                  source={{uri: service.icon || service.type.icon}}
                />
              </View>
              <Text style={classes.serviceName}>{service.name}</Text>
              <Text style={classes.serviceCategory}>{service.type.name}</Text>
            </View>
            <View style={classes.trikoWrapper}>
              <RequestStatus paidOut={paidOut} request={request} />
              {isExpired &&
                [
                  STATUS_PENDING,
                  STATUS_ACCEPTED,
                  STATUS_PAYMENT,
                  STATUS_WAITING_FOR_TRIKO,
                ].includes(workflow) && <ExpiredLabel />}
              {!hideTrikoInfo && <TrikoInfo triko={triko} />}
            </View>
          </View>
        </SafeAreaView>
      </Slide>
      {!disableStatus && (
        <Slide delay={500} direction="top" style={classes.statusAnimWrapper}>
          <View style={classes.statusWrapper}>
            <Text style={classes.pendingText}>{statusText}</Text>
          </View>
        </Slide>
      )}
    </>
  );
};

export default RequestHeader;
