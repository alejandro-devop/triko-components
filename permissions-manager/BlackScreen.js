import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import styles from './styles';
import {useStyles} from 'hooks/index';
import HelpTextRender from 'shared/components/permissions-manager/help-text-render';

const BlackScreen = ({onRequest, reRequest, helpText}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.textWrapper}>
        <Text style={classes.text}>
          before_to_continue_we_need_some_permissions
        </Text>
      </View>
      <View style={classes.permissionsList}>
        <HelpTextRender helpText={helpText} />
      </View>
      <View style={classes.buttonWrapper}>
        <Button onPress={onRequest} primary>
          {reRequest ? 'update_text' : 'allow_text'}
        </Button>
      </View>
    </View>
  );
};

BlackScreen.propTypes = {
  onRequest: PropTypes.func,
};

export default BlackScreen;
