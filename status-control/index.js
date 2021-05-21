import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import SwitchButton from './switch-button';
import useUpdateTriko from 'shared/hooks/use-update-triko';
import useTranslation from 'shared/hooks/use-translate';
import useNotify from 'shared/hooks/use-notification';

/**
 * This component allows to control the user status
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {*}
 * @constructor
 */
const StatusControl = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {success} = useNotify();
  const {
    loading,
    triko: {trikoAttrs = {}},
    updateTriko,
  } = useUpdateTriko();
  const isVisible = trikoAttrs.attrs
    ? Boolean(parseInt(trikoAttrs.attrs.is_visible))
    : false;
  const onToggleSwitch = async () => {
    const newState = !isVisible;
    await updateTriko({
      attrs: {
        is_visible: newState ? '1' : '0',
      },
      onSuccess: () => {
        success(
          _t(
            newState
              ? 'user_status_change_active'
              : 'user_status_change_inactive',
          ),
        );
      },
    });
  };
  return (
    <View style={classes.root}>
      <View style={classes.buttonWrapper}>
        <SwitchButton onPress={onToggleSwitch} initialState={isVisible} />
        {loading && <View style={classes.mask} />}
      </View>
    </View>
  );
};

export default StatusControl;
