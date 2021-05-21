import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import locales from '../locales';
import Label from 'shared/components/base/label';
import Text from 'shared/components/base/text';
import styles from './styles';
import LandingLayout from 'main/layouts/landing-layout';
import {HeaderIcon} from 'main/screens/landing/components';
import {useStyles} from '@triko-app/hooks';
import useAvailableCountries from 'shared/hooks/use-available-countries';
import Slide from 'shared/components/anims/Slide';
import Flag from 'react-native-flags';

const NotDefinedScreen = ({lang = 'en', onSelectCountry}) => {
  const {title} = locales[lang];
  const [classes] = useStyles(styles);
  const countries = useAvailableCountries();
  const handleSelectLanguage = ({languages = [], code}) => {
    const [language] = languages;
    onSelectCountry({
      countryCode: code,
      locale: language,
      appRegion: `${language}-${code}`,
    });
  };
  return (
    <LandingLayout disableBoundary>
      <HeaderIcon />
      <View style={classes.root}>
        <Slide direction={'bottom'} style={classes.optionsContainer}>
          <Label style={classes.label}>{title}</Label>
          <View style={classes.itemsWrapper}>
            {countries.map((country, key) => (
              <TouchableOpacity
                key={`country-${key}`}
                style={classes.itemWrapper}
                onPress={() => handleSelectLanguage(country)}>
                <View style={classes.iconWrapper}>
                  <Flag
                    code={country.code}
                    size={Platform.select({ios: 32, android: 24})}
                    type="flat"
                  />
                </View>
                <Text>{country.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Slide>
      </View>
    </LandingLayout>
  );
};

export default NotDefinedScreen;
