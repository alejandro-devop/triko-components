import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import BorderedButton from 'shared/components/base/buttons/bordered-button';
import Text from 'components/base/text';
import useTranslation from 'hooks/useTranslation';
import {STATUS_ACCEPTED, STATUS_PENDING} from 'config/request-statuses';
import {STATUS_APPROVED} from 'config/document-status';

/**
 * This component allows to render the current cart actions
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onAccept
 * @param onView
 * @param onCancel
 * @param workflow
 * @returns {*}
 * @constructor
 */
const CardActions = ({onAccept, onView, onCancel, workflow}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {workflow === STATUS_PENDING && (
        <>
          <View style={[classes.buttonWrapper, classes.buttonWrapperFirst]}>
            <BorderedButton onPress={onAccept} icon="check" success />
            <Text style={classes.label}>accept_text</Text>
          </View>
          <View style={classes.buttonWrapper}>
            <BorderedButton danger icon="times" onPress={onCancel} />
            <Text style={classes.label}>reject_text</Text>
          </View>
        </>
      )}
      {workflow === STATUS_ACCEPTED && (
        <View style={[classes.buttonWrapper, classes.buttonWrapperFirst]}>
          <BorderedButton onPress={onView} icon="eye" />
          <Text style={classes.label}>view_text</Text>
        </View>
      )}
    </View>
  );
};

export default CardActions;
