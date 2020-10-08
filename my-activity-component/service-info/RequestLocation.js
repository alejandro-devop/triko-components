import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from 'hooks/index';
import LinkButton from 'components/base/buttons/link-button';
import Geocoding from 'react-native-geocoding';
import useTranslation from 'hooks/useTranslation';
import {SkeletonLoader} from 'components/base/loaders';

const RequestLocation = ({delay = 200, onViewMap, request}) => {
  const [classes] = useStyles(styles);
  const {latitude, longitude} = request.attrs || {};
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
      {loading && <SkeletonLoader style={classes.loader} />}
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
  loader: {
    height: 20,
    width: 100,
  },
  root: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 12,
  },
});

export default RequestLocation;
