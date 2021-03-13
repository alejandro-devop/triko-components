import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import MapPreview from './MapPreview';
import Icon from 'components/base/icon';
import Button from 'components/base/buttons/button';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';

const MarketPreview = ({market = {}, onSelectMarket, onClearSelection}) => {
  const {name, description, latitude, longitude} = market;
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.header}>
        <View style={classes.textContent}>
          <Text variant="subtitle" style={classes.title}>
            {name}
          </Text>
        </View>
        <View style={classes.iconWrapper}>
          <Icon name="store-alt" style={classes.icon} />
        </View>
      </View>
      {description && (
        <View style={classes.addressWrapper}>
          <Icon name="map-marker" style={classes.iconAddress} />
          <Text style={classes.addressText}>{description}</Text>
        </View>
      )}
      <MapPreview location={{latitude, longitude}} />
      <View style={classes.actions}>
        <Button secondary onPress={onSelectMarket}>
          {_t('select_this_market')}
        </Button>
        <Button onPress={onClearSelection} primary>
          {_t('select_other_market')}
        </Button>
      </View>
    </View>
  );
};

const styles = ({palette}) => ({
  addressText: {
    color: palette.black,
  },
  addressWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  actions: {
    marginTop: 10,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
  },
  iconAddress: {
    color: palette.grayLight,
    marginRight: 20,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blueLight,
  },
  root: {paddingHorizontal: 20},
  textContent: {
    flex: 1,
  },
  title: {
    color: palette.blue,
    fontWeight: '600',
  },
});

export default MarketPreview;
