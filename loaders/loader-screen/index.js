import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'shared/components/base/text';
import LoaderIcon from 'shared/components/loaders/loader-icon';

/**
 * This component allows to render a loading screen while fetching languages.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const LoaderScreen = ({text = false}) => (
  <View style={styles.root}>
    <LoaderIcon />
    {text && (
      <Text style={styles.text} variant="caption">
        {text}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    marginTop: 10,
  },
});

export default LoaderScreen;
