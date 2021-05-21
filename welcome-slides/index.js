import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import GuideSlides from './guide-slides';
import styles from './styles';

const WelcomeSlides = ({isClient, slides = [], onFinish}) => {
  const [classes] = useStyles(styles);
  if (slides.length === 0) {
    return null;
  }
  return (
    <View style={classes.root}>
      <GuideSlides isClient={isClient} slides={slides} onFinish={onFinish} />
    </View>
  );
};

export default WelcomeSlides;
