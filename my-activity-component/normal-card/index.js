import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import CardIcon from '../card-icon';
import ServiceRate from '../ServiceRate';
import TrikoInfo from '../info-triko';
import ClientInfo from '../info-client';
import ServiceInfo from './ServiceInfo';
import ConfirmIcon from '../ConfirmIcon';
import {
  STATUS_ACCEPTED,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_STARTED,
} from 'config/request-statuses';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const NormalCard = ({isTriko, request = {}}) => {
  const {triko = {}, client = {}} = request;
  const [classes] = useStyles(styles);
  const {transition = {}, details = []} = request;
  const [detail = {}] = details;
  const {service} = detail;
  const workflow = transition ? transition.workflow : '';
  const icon = service.icon || service.type.icon;
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon
          image={{uri: icon}}
          primary={service.name}
          classes={{
            imageWrapper: classes.imageWrapper,
            image: classes.image,
          }}
        />
        <ServiceRate rate={10000} />
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo request={request} showDate />
        {!isTriko && <TrikoInfo triko={triko} />}
        {isTriko && <ClientInfo client={client} />}
      </View>
      {acceptedStatus.includes(workflow) && <ConfirmIcon />}
    </View>
  );
};

const styles = () => ({
  image: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#FFF',
    borderRadius: 100,
  },
  root: {
    flexDirection: 'row',
  },
  serviceWrapper: {
    flex: 3,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
});

export default NormalCard;
