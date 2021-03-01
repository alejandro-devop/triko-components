import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import CardIcon from '../card-icon';
import RateForClient from '../rate-for-client';
import TrikoInfo from '../info-triko';
import ClientInfo from '../info-client';
import ServiceInfo from '../service-info';
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
  STATUS_PAYMENT,
  STATUS_PENDING,
  STATUS_STARTED,
} from 'config/request-statuses';
import ExpiredLabel from 'shared/components/requests-list/expired-label';
import useRequestUpdate from 'shared/hooks/use-request-update';

const acceptedStatus = [
  STATUS_PAYMENT,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const NormalCard = ({
  expired,
  isTriko,
  onAccept,
  onCancel,
  onView,
  onStart,
  onViewOnMap,
  request = {},
  workflow,
  isPaid,
  withStatus,
}) => {
  const {triko: trikos = [], client = {}} = request;
  const [triko = {}] = trikos;
  const [classes] = useStyles(styles);
  const [detail = {}] = request.details || [];
  const {service} = detail;
  const icon = service.icon || service.type.icon;
  const cardAlternative =
    withStatus && isPaid && acceptedStatus.includes(workflow);
  const {} = useRequestUpdate();
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        <CardIcon
          alternative={cardAlternative}
          image={{uri: icon}}
          isPaid={isPaid}
          primary={service.name}
          isTriko={isTriko}
          classes={{
            imageWrapper: classes.imageWrapper,
            image: classes.image,
          }}
        />
        {!isTriko && (
          <>
            <RateForClient request={request} isPaid={isPaid} />
          </>
        )}
        {isTriko && (
          <>
            <ClientInfo
              alternative={cardAlternative}
              isPaid={isPaid}
              client={client}
              isTriko={isTriko}
            />
          </>
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        <ServiceInfo
          alternative={cardAlternative}
          acceptedStatus={acceptedStatus}
          isTriko={isTriko}
          isPaid={isPaid}
          request={request}
          showDate
          hideDistance={cardAlternative}
          onViewMap={onViewOnMap}
          workflow={workflow}
        />
        {isTriko && (
          <>
            {expired &&
              !isPaid &&
              [STATUS_PENDING, STATUS_ACCEPTED, STATUS_PAYMENT].includes(
                workflow,
              ) && <ExpiredLabel />}
            <RateInfo isPaid={isPaid} request={request} workflow={workflow} />
            {/*{expired && !isPaid ? null : (*/}
            <CardActions
              alternative={cardAlternative}
              withStatus={withStatus}
              onAccept={onAccept}
              onCancel={onCancel}
              onStart={onStart}
              onView={onView}
              isPaid={isPaid}
              workflow={workflow}
            />
            {/*)}*/}
          </>
        )}
        {!isTriko && (
          <>
            {expired &&
              [STATUS_PENDING, STATUS_ACCEPTED, STATUS_PAYMENT].includes(
                workflow,
              ) && <ExpiredLabel />}
            <TrikoInfo triko={triko} />
          </>
        )}
      </View>
    </View>
  );
};

export default NormalCard;
