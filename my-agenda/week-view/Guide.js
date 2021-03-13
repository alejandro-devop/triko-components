import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import useTranslation from 'shared/hooks/use-translate';
import useStyles from 'shared/hooks/use-styles';

const Guide = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();

  return (
    <View style={classes.root}>
      <View style={classes.button}>
        <View style={[classes.control, classes.controlEvent]} />
        <Text style={classes.text}>{_t('event_label')}</Text>
      </View>
      <View style={classes.button}>
        <View style={[classes.control, classes.controlAvailable]} />
        <Text style={classes.text}>{_t('available_label')}</Text>
      </View>
      <View style={classes.button}>
        <View style={[classes.control, classes.controlNotAvailable]} />
        <Text style={classes.text}>{_t('not_available_label')}</Text>
      </View>
    </View>
  );
};

const styles = ({palette}) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  control: {
    width: 16,
    height: 16,
    marginRight: 10,
    borderRadius: 100,
    borderColor: palette.grayLight,
    borderWidth: 1,
  },
  controlEvent: {
    backgroundColor: palette.blue,
  },
  controlAvailable: {
    backgroundColor: palette.blueLight,
  },
  controlNotAvailable: {
    backgroundColor: '#FFF',
  },
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
  },
});

export default Guide;
