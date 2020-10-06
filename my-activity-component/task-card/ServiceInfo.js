import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import useRequestStatus from 'shared/hooks/use-request-status';

const ServiceInfo = ({request = {}}) => {
  const {transition} = request;
  const workflow = transition ? transition.workflow : '';
  const status = useRequestStatus(workflow);
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={classes.title}>{status}</Text>
    </View>
  );
};

const styles = () => ({
  date: {
    fontSize: 14,
    marginBottom: 20,
  },
  root: {
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '600',
  },
});

export default ServiceInfo;
