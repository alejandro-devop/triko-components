import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useSession, useStyles} from 'hooks/index';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import useTimer from 'shared/hooks/use-timer';
import {STATUS_STARTED} from 'config/request-statuses';
import Icon from 'shared/components/base/icon';
import {getElapsedTime} from 'shared/utils/functions';
import Button from 'shared/components/base/buttons/button';
import RatingStars from 'components/base/rating-stars';
import useNavigate from 'shared/hooks/use-navigate';

const ServiceItem = ({isTriko, request = {}}) => {
  const [classes] = useStyles(styles);
  const {navigation} = useNavigate();
  const {
    setKey,
    stack: {},
  } = useSession();
  const {history, duration} = request;
  const startedTransition = history.find(
    ({transition = {}}) => transition.workflow === STATUS_STARTED,
  );
  const timeInfo = getElapsedTime(startedTransition.created_at, null, true);
  const {hours = 0, minutes = 0, seconds = 0} = timeInfo;
  const {formattedAlt, time = {}} = useTimer({
    initialDate: startedTransition.created_at,
    hours,
    minutes,
    seconds,
    duration: parseInt(duration, 10),
  });
  const {triko: trikos = [], details = [], client = {}} = request;
  const [serviceDetail = {}] = details;
  const {service = {}} = serviceDetail;
  const [triko = {}] = trikos;
  const {user = {}, rating = 5} = isTriko ? client : triko;
  const {photo_url: photo} = user;
  const {name: serviceName} = service;
  const serviceIcon = service.icon ? service.icon : service.type.icon;

  const handleView = () => {
    setKey('selectedToExecution', request);
    navigation.navigate('execution');
  };

  return (
    <View style={classes.root}>
      <View style={classes.serviceIconWrapper}>
        <PreImage style={classes.serviceIcon} source={{uri: serviceIcon}} />
      </View>
      <View style={classes.serviceInfoWrapper}>
        <Text style={classes.serviceText}>{serviceName}</Text>
        <View style={classes.timeInfoWrapper}>
          <Icon name="clock" style={classes.timeIcon} />
          <View style={classes.clockWrapper}>
            <Text style={[classes.text, classes.time]}>{formattedAlt}:</Text>
            <Text style={[classes.text, classes.seconds]}>
              {(time.seconds < 10 ? '0' : '') + time.seconds}
            </Text>
          </View>
          <Button
            alternative
            size="xxs"
            style={classes.button}
            onPress={handleView}>
            view_execution
          </Button>
        </View>
      </View>
      <View style={classes.trikoWrapper}>
        <View style={classes.avatarWrapper}>
          <PreImage style={classes.avatar} source={{uri: photo}} />
        </View>
        <RatingStars value={rating} size={6} />
      </View>
    </View>
  );
};

export default ServiceItem;
