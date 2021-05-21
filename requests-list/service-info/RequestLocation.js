import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import {useStyles} from '@triko-app/hooks';
import LinkButton from 'components/base/buttons/link-button';
import Geocoding from 'react-native-geocoding';
import useTranslation from 'shared/hooks/use-translate';
import {SkeletonLoader} from 'components/base/loaders';
import classNames from 'shared/utils/classnames';

const RequestLocation = ({
  alternative,
  hideMapButton,
  delay = 200,
  isPaid,
  onViewMap,
  request,
}) => {
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
          <Text
            style={classNames(
              {text: true, textAlt: alternative || isPaid},
              classes,
            )}>
            {locationInfo}
          </Text>
          {!hideMapButton && (
            <LinkButton
              onPress={onViewMap}
              primary
              style={classNames({link: true, linkPaid: isPaid}, classes)}
              styles={{root: classes.linkWrapper}}>
              {_t('view_in_map')}
            </LinkButton>
          )}
        </>
      )}
    </View>
  );
};

const styles = ({palette}) => ({
  link: {
    fontSize: 12,
    fontWeight: '800',
    textDecorationLine: 'none',
  },
  linkPaid: {
    color: '#FFF',
    fontSize: 13,
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
  textAlt: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default RequestLocation;
