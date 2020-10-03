import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'app/src/main/components/base/icon';
import Text from 'app/src/main/components/base/text';
import {useStyles} from 'hooks';

const styles = () => ({
  icon: {
    flex: 2,
  },
  label: {
    flex: 10,
    marginRight: 15,
  },
  root: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    opacity: 0.7,
  },
});

const HasPermissionLabel = ({label}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text style={classes.label}>{label}</Text>
      <Icon style={classes.icon} name="check-circle" />
    </View>
  );
};

HasPermissionLabel.propTypes = {
  label: PropTypes.string,
};

export default HasPermissionLabel;
