import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import IconButton from 'shared/components/base/buttons/icon-button';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';

const Meridian = ({value = 'a.m', onChange}) => {
  const [classes] = useStyles(styles);
  const [currentMeridian, setMeridian] = useState(value);

  const onChangeMeridian = () => {
    const newMeridian = currentMeridian === 'am' ? 'pm' : 'am';
    setMeridian(newMeridian);
    if (onChange) {
      onChange(newMeridian);
    }
  };

  return (
    <View style={classes.root}>
      <View style={classes.offset} />
      <View style={classes.textWrapper}>
        <Text style={classes.text}>{currentMeridian}</Text>
      </View>
      <IconButton
        name="chevron-down"
        onPress={onChangeMeridian}
        iconStyles={classes.icon}
      />
    </View>
  );
};

const styles = ({palette}) => ({
  icon: {
    color: palette.blue,
  },
  input: {
    textAlign: 'center',
  },
  offset: {
    width: 40,
    height: Platform.select({
      ios: 40,
      android: 30,
    }),
  },
  root: {
    width: 60,
    height: 120,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: palette.gray,
  },
  textWrapper: {
    backgroundColor: palette.white,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
});

export default Meridian;
