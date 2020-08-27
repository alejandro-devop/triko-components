import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import palette from 'themes/styles/palette';

const CircularLoader = () => (
  <View>
    <ActivityIndicator color={palette.blue} size={'large'} />
  </View>
);

export default CircularLoader;
