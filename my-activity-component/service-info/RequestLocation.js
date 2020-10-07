import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from 'hooks/index';
import LinkButton from 'components/base/buttons/link-button';
import Geocoding from 'react-native-geocoding';
import useTranslation from 'hooks/useTranslation';

const RequestLocation = ({delay = 200, onViewMap, request}) => {
  const [classes] = useStyles(styles);
  const {latitude, longitude} = request.attrs || {};
  const {_t} = useTranslation();
  const [locationInfo, setLocationInfo] = useState(null);

  const getLocationInfo = async () => {
    try {
      const {results = []} = await Geocoding.from({latitude, longitude});
      const [first] = results;
      if (first) {
        const [, city] = first.formatted_address.split(',');
        setLocationInfo(`${city}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getLocationInfo();
    }, delay);
  }, []);

  return (
    <View style={classes.root}>
      {locationInfo && (
        <>
          <Text style={[classes.text]}>{locationInfo}</Text>
          <LinkButton
            onPress={onViewMap}
            primary
            style={classes.link}
            styles={{root: classes.linkWrapper}}>
            {_t('view_in_map')}
          </LinkButton>
        </>
      )}
    </View>
  );
};

const styles = () => ({
  link: {
    fontSize: 12,
    fontWeight: '800',
    textDecorationLine: 'none',
  },
  linkWrapper: {
    paddingVertical: 0,
  },
  root: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 12,
  },
});

export default RequestLocation;
