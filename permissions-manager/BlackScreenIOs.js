import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'components/base/text';
import styles from './styles';
import Card from 'components/base/card';
import {LinkButton} from 'components/base/buttons';
import HasPermissionLabel from './HasPermissionLabel';
import useStyles from 'hooks/useStyles';
import useTranslation from 'hooks/useTranslation';
import trikoLogo from 'assets/logos/triko_logo.png';
import ShowIcon from 'components/base/show-icon';

const BlackScreenIOs = ({
  granted = [],
  onRequest,
  requested = [],
  labels = {},
  message = 'permissions_request_message_1', // Txt: We need some permission to continue
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Card style={classes.root}>
      <View style={classes.textWrapper}>
        <ShowIcon disableShadow source={trikoLogo} />
        <Text style={classes.text}>{_t(message)}</Text>
      </View>
      <View style={classes.buttonWrapper}>
        {requested.map((permission, key) => {
          const itemKey = `permission-${key}`;
          if (granted.includes(permission)) {
            return (
              <HasPermissionLabel
                key={itemKey}
                label={_t(labels[permission])}
              />
            );
          }
          return (
            <LinkButton
              style={classes.button}
              key={itemKey}
              onPress={() => (onRequest ? onRequest(permission) : null)}>
              {_t(labels[permission] || permission)}
            </LinkButton>
          );
        })}
      </View>
    </Card>
  );
};

BlackScreenIOs.propTypes = {
  granted: PropTypes.array,
  iosLabels: PropTypes.oneOfType([PropTypes.object]),
  message: PropTypes.string,
  onRequest: PropTypes.func,
};

export default BlackScreenIOs;
