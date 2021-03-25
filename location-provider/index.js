import React, {useState, useEffect} from 'react';
import {NativeModules, SafeAreaView, Platform, View} from 'react-native';
import {useSession} from 'hooks/index';
import Text from 'shared/components/base/text';
import NotDefinedScreen from './not-defined-screen';
import LoaderScreen from 'components/base/loaders/LoaderScreen';

const LocationProvider = ({children}) => {
  const {
    stack: {appRegion},
    setAll,
  } = useSession();
  const [definedRegion, setDefinedRegion] = useState(false);
  const [loading, setLoading] = useState(true);

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  const [lang] = deviceLanguage.split('_');

  const handleSelectCountry = async (regionalConfig) => {
    await setAll(regionalConfig);
    setTimeout(() => {
      setDefinedRegion(true);
    }, 500);
  };

  useEffect(() => {
    if (!appRegion) {
      setLoading(false);
    } else {
      setDefinedRegion(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoaderScreen text={false} />;
  }
  return definedRegion ? (
    children
  ) : (
    <NotDefinedScreen onSelectCountry={handleSelectCountry} lang={lang} />
  );
};

export default LocationProvider;
