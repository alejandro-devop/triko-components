import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import taskIcon from 'shared/assets/icons/triko-task.png';
import CardIcon from '../card-icon';
import Text from 'components/base/text';
import ServiceInfo from '../service-info';
import ConfirmIcon from '../ConfirmIcon';
import {
  STATUS_ACCEPTED,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_PAYMENT,
  STATUS_STARTED,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';
import Icon from 'components/base/icon';
import moment from 'moment';
import ClientInfo from '../info-client';
import DistanceRender from 'shared/components/request-commons/distance-render';
import DateRender from 'shared/components/request-commons/date-render';
import FavorIcon from '../favor-icon';
import serviceIcon from 'shared/assets/icons/triko-task.png';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import Candidates from 'shared/components/requests-list/shopper-card/candidates';
import PostulatedMessage from 'shared/components/requests-list/postulated-message';

const acceptedStatus = [
  STATUS_ACCEPTED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_CONFIRM_START,
  STATUS_CONFIRM_FINISHED,
  STATUS_STARTED,
  STATUS_FINISHED,
];

const TaskCard = ({
  isTriko,
  onViewOnMap,
  onView,
  userLocation,
  onStart,
  request = {},
}) => {
  const {client = {}} = request;
  const [classes] = useStyles(styles);
  const {attributes, transition, application_date} = request;
  const requestAttr = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const workflow = transition ? transition.workflow : '';
  const {_t} = useTranslation();
  const date = (application_date ? moment(application_date) : moment()).format(
    'MMM DD YYYY',
  );
  const time = (application_date ? moment(application_date) : moment()).format(
    'h:mm a',
  );
  const {instructions: shortDescription} = requestAttr;
  return (
    <View style={classes.root}>
      <View style={classes.serviceWrapper}>
        {isTriko && (
          <>
            <ClientInfo isTriko={isTriko} client={client} isFavor />
            <DistanceRender
              onViewOnMap={onViewOnMap}
              userLocation={userLocation}
              request={request}
            />
            <DateRender request={request} />
          </>
        )}
        {!isTriko && (
          <>
            <CardIcon
              image={taskIcon}
              primary={_t('task_label').toUpperCase()}
            />
            {shortDescription && (
              <Text style={classes.shortDescription}>{shortDescription}</Text>
            )}
            {/*{date && <Text style={classes.date}>{`${date} | ${time}`}</Text>}*/}
          </>
        )}
      </View>
      <View style={classes.avatarInfoWrapper}>
        {isTriko && (
          <>
            <FavorIcon iconSource={serviceIcon} name={_t('triko_task')} />
            <View style={classes.actionsWrapper}>
              {workflow !== STATUS_PAYMENT && (
                <Button
                  primary
                  size="xs"
                  style={classes.button}
                  onPress={onView}>
                  {_t('view_text')}
                </Button>
              )}
              {workflow === STATUS_PAYMENT && (
                <Button
                  alternative
                  size="xs"
                  textStyle={classes.altButton}
                  onPress={onStart}>
                  start_text
                </Button>
              )}
            </View>
          </>
        )}
        {!isTriko && (
          <>
            <ServiceInfo request={request} />
            <Candidates request={request} max={6} />
            {workflow === STATUS_ACCEPTED && (
              <View style={classes.actionsPending}>
                <Button primary size="xxs" onPress={onView}>
                  make_payment
                </Button>
              </View>
            )}
          </>
        )}
      </View>
      {isTriko && workflow === STATUS_WAITING_FOR_TRIKO && (
        <PostulatedMessage isTriko={isTriko} request={request} />
      )}
      {!isTriko && acceptedStatus.includes(workflow) && <ConfirmIcon />}
    </View>
  );
};

const styles = ({palette}) => ({
  actionsWrapper: {
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    minWidth: 100,
  },
  altButton: {
    color: palette.success,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  icon: {
    color: palette.blue,
  },
  label: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    top: 5,
  },
  labelText: {
    fontSize: 16,
    marginRight: 10,
  },
  root: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  noTrikosLabel: {
    textAlign: 'center',
    color: palette.gray,
  },
  noTrikosLabelWrapper: {},
  serviceWrapper: {
    flex: 4,
  },
  avatarInfoWrapper: {
    flex: 4,
    alignItems: 'flex-end',
  },
  shortDescription: {
    fontSize: 14,
    color: palette.gray,
  },
});

export default TaskCard;
