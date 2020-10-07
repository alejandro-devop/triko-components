import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import Text from 'components/base/text';
import styles from './styles';
import moment from 'moment';
import Icon from 'components/base/icon';

/**
 * this component renders the date for the shopper requests
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param request
 * @returns {*}
 * @constructor
 */
const DateRender = ({request = {}}) => {
  const [classes] = useStyles(styles);
  const date = moment(request.application_date, 'YYYY-MM-DD HH:mm:ss');
  const formattedDate = date.format('MMM DD YYYY ');
  const formattedTime = date.format('h:mm a');
  return (
    <View style={classes.root}>
      <Icon name="clock" style={classes.icon} />
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{formattedDate}</Text>
        <Text style={classes.text}>{formattedTime}</Text>
      </View>
    </View>
  );
};

export default DateRender;
