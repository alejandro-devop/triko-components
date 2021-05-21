import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import TabIcon from './TabIcon';
import useTranslation from 'shared/hooks/use-translate';
import useSession from 'hooks/useSession';
import options from 'config/tab-options';
import tabIcons from './tab-icons';

/**
 * This component renders the application main navigation bar.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param navigation
 * @param descriptors
 * @param state
 * @param styles
 * @returns {null|*}
 * @constructor
 */
const TrikoTabs = ({navigation, state, styles}) => {
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

TrikoTabs.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.any]),
  state: PropTypes.oneOfType([PropTypes.any]),
  styles: PropTypes.oneOfType([PropTypes.Object, PropTypes.array]),
};

export default TrikoTabs;
