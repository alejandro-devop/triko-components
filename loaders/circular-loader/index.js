import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import palette from 'themes/styles/palette';

const CircularLoader = ({color, size = 'large'}) => (
  <View>
    <ActivityIndicator color={color || palette.blue} size={size} />
  </View>
);

export default CircularLoader;
