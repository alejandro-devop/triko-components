import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import ServiceInfo from '../service-info';
import UserInfo from '../user-info';
import Slide from 'shared/components/anims/Slide';
import Text from 'shared/components/base/text';
import moment from 'moment';
import useRequestStatus from 'shared/hooks/use-request-status';
import useTranslation from 'hooks/useTranslation';

const RequestHeader = ({request = {}, isTriko}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {application_date, transition = {}} = request;
  const statusLabel = useRequestStatus(transition.workflow);
  if (!request) {
    return null;
  }
  const dateObj = moment(application_date, 'YYYY-MM-DD HH:mm:ss');
  const dateLabel = dateObj.format('M/D h:mm a');
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Slide direction="top">
        <SafeAreaView style={classes.root}>
          <View style={classes.contentWrapper}>
            <View style={[classes.panel, classes.left]}>
              <ServiceInfo request={request} />
            </View>
            <View style={[classes.panel, classes.right]}>
              <Text style={[classes.text, classes.textTitle]}>{statusLabel}</Text>
              <Text style={[classes.text]}>
                {_t('request_execution_date', {date: dateLabel})}
              </Text>
              <UserInfo request={request} isTriko={isTriko} />
            </View>
          </View>
          <View style={classes.tip} />
        </SafeAreaView>
      </Slide>
      </>
  );
};

export default RequestHeader;
