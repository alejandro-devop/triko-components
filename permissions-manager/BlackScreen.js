import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from 'app/src/main/components/base/text';
import styles from './styles';
import Card from 'app/src/main/components/base/card';
import {Button} from 'app/src/main/components/base/buttons';
import securityIcon from 'app/src/assets/icons/security-icon.png';
import {useStyles} from 'hooks';
import ShowIcon from 'components/base/show-icon';

const BlackScreen = ({onRequest, reRequest}) => {
  const [classes] = useStyles(styles);
  return (
    <Card style={classes.root}>
      <View style={classes.textWrapper}>
        <ShowIcon disableShadow source={securityIcon} />
        <Text style={classes.text}>
          Antes de continuar necesitas conseder privilegios a esta aplicación.
        </Text>
      </View>
      <View style={classes.buttonWrapper}>
        <Button onPress={onRequest} primary>
          {reRequest ? 'Actualizar' : 'Permitir'}
        </Button>
      </View>
    </Card>
  );
};

BlackScreen.propTypes = {
  onRequest: PropTypes.func,
};

export default BlackScreen;
