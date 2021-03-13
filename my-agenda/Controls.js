import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from 'hooks/index';
import useTranslation from 'shared/hooks/use-translate';
import classNames from 'shared/utils/classnames';

const Controls = ({currentOption = 0, onChangeOption}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const options = ['month_Label', 'week_label', 'day_label'];
  return (
    <View style={classes.root}>
      {options.map((label, key) => (
        <TouchableOpacity
          style={classNames(
            {button: true, active: currentOption === key},
            classes,
          )}
          onPress={() => onChangeOption(key)}
          key={`controls-${key}`}>
          <Text
            style={classNames(
              {buttonText: true, buttonTextActive: currentOption === key},
              classes,
            )}>
            {_t(label)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = ({palette}) => ({
  button: {
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: palette.orange,
  },
  buttonTextActive: {
    color: palette.blue,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default Controls;
