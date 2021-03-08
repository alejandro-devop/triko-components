import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'hooks/useStyles';
import Stepper from 'components/base/stepper';
import ClientProfile from './client-profile';
import useTranslation from 'shared/hooks/use-translate';

const Header = ({statusLabel, currentStep = 0, steps = 2, request = {}}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {client = {}} = request || {};
  return (
    <View style={classes.root}>
      <View style={classes.titleWrapper}>
        <Text style={classes.title}>{_t(statusLabel)}</Text>
      </View>
      <Stepper current={currentStep} steps={steps} />
      <ClientProfile client={client} />
    </View>
  );
};

const styles = ({palette}) => ({
  title: {
    textAlign: 'center',
    color: palette.orange,
  },
  titleWrapper: {
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
});

export default Header;
