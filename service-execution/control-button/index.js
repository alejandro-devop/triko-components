import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from 'components/base/icon';
import styles from './styles';
import palette from 'themes/styles/palette';
import Text from 'components/base/text';
import Guide from 'shared/components/anims/AnimatedArrowRight';

const ControlButton = ({
  children,
  disableGuide,
  percentage = 0,
  label,
  size = 140,
  onPress,
  icon,
  disabled,
}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.buttonWrapper}>
        <AnimatedCircularProgress
          size={size}
          width={10}
          fill={percentage}
          rotation={0}
          tintColor={palette.blue}
          onAnimationComplete={() => null}
          backgroundColor={palette.grayLighter}>
          {() =>
            !children ? (
              <TouchableOpacity
                style={classes.iconWrapper}
                onPress={() => (!disabled ? onPress() : null)}>
                <Icon name={icon} style={classes.icon} />
              </TouchableOpacity>
            ) : (
              children
            )
          }
        </AnimatedCircularProgress>
        {!disableGuide && (
          <View style={classes.guideWrapper}>
            <Guide />
          </View>
        )}
      </View>
      <View style={classes.labelWrapper}>
        <Text style={classes.label}>{label}</Text>
      </View>
    </View>
  );
};

export default ControlButton;
