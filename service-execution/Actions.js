import React from 'react';
import {Linking, View} from 'react-native';
import {CircleButton} from '../base/buttons';
import useStyles from 'hooks/useStyles';
import {countries} from 'countries-list';

const Actions = ({currentStep, messages = 0, request = {}, toggleChat}) => {
  const [classes] = useStyles(styles);
  const makeCall = async () => {
    const {
      user: {phonenumber, country},
    } = request.triko;
    const {phone} = countries[country.code];
    const phoneToCall = `+${phone} ${phonenumber}`;
    Linking.openURL(`tel:${phoneToCall}`);
  };
  const openMap = () => {
    const {latitude, longitude} = request.attrs;
    Linking.openURL(
      `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`,
    ).catch(error => {});
  };
  return (
    <View style={classes.root}>
      <CircleButton name="phone" primary onPress={makeCall} />
      <CircleButton
        primary
        name="comments"
        onPress={toggleChat}
        badge={messages}
      />
      {currentStep === 0 && (
        <CircleButton primary name="map-marked-alt" onPress={openMap} />
      )}
    </View>
  );
};

const styles = () => ({
  root: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

export default Actions;
