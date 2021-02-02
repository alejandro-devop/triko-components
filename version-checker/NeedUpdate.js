import React from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  RefreshControl,
  View,
} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import useStyles from 'hooks/useStyles';
import Logo from 'assets/logos/logo-triko-1.png';
import PreImage from 'components/pre-image';
import Text from 'components/base/text';
import Button from 'components/base/buttons/button';
import Icon from 'shared/components/base/icon';
import {APP_PACKAGE_ANDROID, APP_PACKAGE_IOS} from 'react-native-dotenv';
import iosUpdate1Image from 'shared/assets/guides/ios-update-1.png';
import iosUpdate2Image from 'shared/assets/guides/ios-update-2.png';
import useRegionConfigFetch from '../../../contexts/configuration/hooks';

/**
 * Renders a view if the current application does not match the published version.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {*}
 * @constructor
 */
const NeedUpdate = () => {
  const [classes] = useStyles(styles);
  const {refresh, loading: refreshing} = useRegionConfigFetch();

  const goToStore = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`market://details?id=${APP_PACKAGE_ANDROID}`);
    } else {
      Linking.openURL(
        `itms-apps://itunes.apple.com/us/app/apple-store/${APP_PACKAGE_IOS}?mt=8`,
      );
    }
  };

  const handleRefresh = () => {
    refresh();
  };

  const iosSteps = [
    {image: iosUpdate1Image, text: 'ios_update_step_1'},
    {image: iosUpdate2Image, text: 'ios_update_step_2'},
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }>
      <SafeAreaView style={classes.root}>
        <View style={classes.header}>
          <PreImage source={Logo} style={classes.logo} />
        </View>
      </SafeAreaView>
      <View style={[classes.mainWrapper, classes.wrapper]}>
        <View style={classes.titleWrapper}>
          <Text style={classes.titleText}>available_update</Text>
          <Icon name="redo" style={classes.titleIcon} />
        </View>
        <View style={[classes.wrapper, classes.wrapperSecondary]}>
          <View style={classes.guideTextWrapper}>
            <Text style={[classes.guideTitle, classes.guideTitlePrimary]}>
              update_title_1
            </Text>
            <Text style={[classes.guideTitle]}>update_title_2</Text>
          </View>
          {iosSteps.map((item, key) => (
            <View key={`guid-${key}`} style={classes.guideWrapper}>
              <View style={classes.row}>
                <View style={classes.numberWrapper}>
                  <Text style={classes.numberText}>{key + 1}</Text>
                </View>
                <Text style={classes.stepText}>{item.text}</Text>
              </View>
              <View style={classes.imageWrapper}>
                <PreImage style={classes.image} source={item.image} />
              </View>
            </View>
          ))}
          <View style={classes.actions}>
            <Button primary onPress={goToStore}>
              update_application_now
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ({palette, variables: {}}) => ({
  actions: {
    alignItems: 'center',
    marginBottom: 100,
  },
  guideTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
  },
  guideTitlePrimary: {
    color: palette.orange,
  },
  guideTextWrapper: {
    paddingTop: 40,
    marginBottom: 40,
  },
  guideWrapper: {
    marginBottom: 20,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '600',
  },
  numberText: {
    color: '#FFF',
    fontWeight: '600',
  },
  numberWrapper: {
    borderRadius: 100,
    width: 35,
    height: 35,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blue,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 40,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 40,
  },
  titleText: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 20,
  },
  titleIcon: {
    color: '#FFF',
    marginLeft: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    paddingVertical: 20,
  },
  mainWrapper: {
    backgroundColor: palette.orange,
  },
  wrapper: {
    flexGrow: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  wrapperSecondary: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 160,
    height: 80,
  },
  message: {
    width: '100%',
    paddingHorizontal: 10,
  },
  root: {
    backgroundColor: '#FFF',
  },
});

export default NeedUpdate;
