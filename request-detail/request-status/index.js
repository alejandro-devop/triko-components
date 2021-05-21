import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import useRequestStatus from 'shared/hooks/use-request-status';
import moment from 'moment';
import styles from './styles';

const RequestStatus = ({paidOut, request = {}}) => {
  const [classes] = useStyles(styles);
  const {workflow} = request.transition;
  const status = useRequestStatus(workflow, false, paidOut);
  const date = moment(request.application_date).format('MMM DD YYYY | h:mm a');
  return (
    <View style={classes.root}>
      <Text style={classes.text}>{status}</Text>
      <Text style={classes.date}>{date}</Text>
    </View>
  );
};

export default RequestStatus;
