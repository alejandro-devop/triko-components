import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import RowItem from '../commons/RowItem';
import styles from './styles';
import {useStyles, useSession} from 'hooks';
import currency from 'currency-formatter';
import moment from 'moment';

const Component = ({request}) => {
  const [classes] = useStyles(styles);
  const {stack = {}} = useSession();
  const {region} = stack;
  const {
    application_date,
    address,
    details = [],
    attrs = {},
    duration = 0,
  } = request;
  const total = details.reduce((a, v) => a + (v.service.price || 2000), 0);
  const date = moment(application_date, 'YYYY-MM-DD HH:mm:ss').format(
    'MMMM D h:mm a',
  );
  return (
    <View style={classes.root}>
      <RowItem icon="calendar" content={date} />
      <RowItem icon="map-marker" content={address} />
      <RowItem icon="clock" content={`Duration: ${duration} Hrs`} />
      <View style={classes.priceWrapper}>
        <Text style={classes.priceText}>{`Subtotal: ${currency.format(total, {
          locale: region,
          precision: 0,
          format: '%s %v',
        })}`}</Text>
      </View>
    </View>
  );
};

export default Component;
