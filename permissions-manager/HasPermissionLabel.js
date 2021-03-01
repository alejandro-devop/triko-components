import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Icon from 'app/src/main/components/base/icon';
import Text from 'app/src/main/components/base/text';
import {useStyles} from 'hooks';

const styles = () => ({
  icon: {
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
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
      <Icon style={classes.icon} name="check-circle" />
      <Text style={classes.label}>{label}</Text>
    </View>
  );
};

HasPermissionLabel.propTypes = {
  label: PropTypes.string,
};

export default HasPermissionLabel;
