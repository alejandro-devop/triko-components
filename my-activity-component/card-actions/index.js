import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';

/**
 * This component allows to render the current cart actions
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onAccept
 * @param onCancel
 * @returns {*}
 * @constructor
 */
const CardActions = ({onAccept, onCancel}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <View style={[classes.buttonWrapper, classes.buttonWrapperFirst]}>
        <BorderedButton onPress={onAccept} icon="check" success />
        <Text style={classes.label}>{_t('accept_text')}</Text>
      </View>
      <View style={classes.buttonWrapper}>
        <BorderedButton danger icon="times" onPress={onCancel} />
        <Text style={classes.label}>{_t('reject_text')}</Text>
      </View>
    </View>
  );
};

export default CardActions;
