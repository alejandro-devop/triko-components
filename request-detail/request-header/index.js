import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import TrikoInfo from '../triko-info';
import Text from 'components/base/text';
import Slide from 'shared/components/anims/Slide';
import RequestStatus from '../request-status';
import PreImage from 'shared/components/base/pre-image';
import styles from './styles';

const RequestHeader = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const {triko: trikos = [], details = []} = request;
  const [triko = {}] = trikos;
  const {service} = details[0];
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
              <RequestStatus request={request} />
              <TrikoInfo triko={triko} />
            </View>
          </View>
        </SafeAreaView>
      </Slide>
      {/*<Slide delay={500} direction="top" style={classes.statusAnimWrapper}>*/}
      {/*  <View style={classes.statusWrapper}>*/}
      {/*    <Text style={classes.pendingText}>{_t('pending_approval_text')}</Text>*/}
      {/*  </View>*/}
      {/*</Slide>*/}
    </>
  );
};

export default RequestHeader;
