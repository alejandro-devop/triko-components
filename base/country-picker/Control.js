import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import useStyles from 'hooks/useStyles';
import Flag from 'react-native-flags';
import classNames from 'utils/classnames';

const Control = ({country = 'US', transparent, onPress, primaryButton}) => {
  const [classes] = useStyles(styles);
  return (
    <TouchableOpacity
      style={classNames(
        {
          root: true,
          primary: primaryButton,
          transparent,
        },
        [classes],
      )}
      onPress={onPress}>
      <Flag
        code={country}
        size={Platform.select({ios: 24, android: 24})}
        type={'flat'}
      />
    </TouchableOpacity>
  );
};

const styles = ({palette}) => ({
  root: {
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderRadius: 100,
    ...Platform.select({
      ios: {
        width: 40,
        height: 40,
      },
      android: {
        width: 40,
        height: 40,
      },
    }),
  },
  primary: {
    backgroundColor: palette.blueDark,
  },
  transparent: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default Control;
