import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import CardIcon from '../card-icon';
import ServiceRate from '../ServiceRate';
import TrikoInfo from '../info-triko';
import ClientInfo from '../info-client';
import ServiceInfo from '../service-info';
import ConfirmIcon from '../ConfirmIcon';
import RateInfo from '../rate-info';
import CardActions from '../card-actions';
import styles from './styles';
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

const NormalCard = ({
  isTriko,
  onAccept,
  onCancel,
  onViewOnMap,
  request = {},
}) => {
  const {triko: trikos = [], client = {}} = request;
  const [triko = {}] = trikos;
  const [classes] = useStyles(styles);
  const {transition = {}} = request;
  const [detail = {}] = request.details || [];
  const {service} = detail;
  const workflow = transition ? transition.workflow : '';
  const icon = service.icon || service.type.icon;
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon
          image={{uri: icon}}
          primary={service.name}
          isTriko={isTriko}
          classes={{
            imageWrapper: classes.imageWrapper,
            image: classes.image,
          }}
        />
        {!isTriko && (
          <>
            <ServiceRate rate={10000} />
          </>
        )}
        {isTriko && (
          <>
            <ClientInfo client={client} />
          </>
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo
          isTriko={isTriko}
          request={request}
          showDate
          onViewMap={onViewOnMap}
        />
        {isTriko && (
          <>
            <RateInfo request={request} />
            <CardActions onAccept={onAccept} onCancel={onCancel} />
          </>
        )}
        {!isTriko && (
          <>
            <TrikoInfo triko={triko} />
          </>
        )}
      </View>
      {acceptedStatus.includes(workflow) && <ConfirmIcon />}
    </View>
  );
};

export default NormalCard;
