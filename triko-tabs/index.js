import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import TabIcon from './TabIcon';
import useTranslation from 'hooks/useTranslation';
import useSession from 'hooks/useSession';
import options from 'config/tab-options';
import tabIcons from './tab-icons';

const TrikoTabs = ({navigation, descriptors, state, styles}) => {
  const {routeNames = []} = state;

  const {
    stack: {logged},
  } = useSession();
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);

  if (!logged) {
    return null;
  }

  const selectOption = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={classes.root}>
      <View style={classes.container}>
        {options.map((option, key) => (
          <TabIcon
            key={`tab-option-${key}`}
            icon={tabIcons[option.icon]}
            label={_t(option.label)}
            selected={option.path === routeNames[state.index]}
            onPress={() => selectOption(option.path)}
            Component={option.component}
          />
        ))}
      </View>
    </View>
  );
};

export default TrikoTabs;
