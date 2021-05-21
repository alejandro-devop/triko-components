import React, {useRef, useState} from 'react';
import {StatusBar, Dimensions, ScrollView, View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import GuideSlide from '../guide-slide';
const screenWidth = Dimensions.get('window').width;

const GuideSlides = ({isClient, slides = [], initialSlide = 0, onFinish}) => {
  const [classes] = useStyles(styles);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const scrollRef = useRef(null);
  const totalSlides = slides.length;
  let preScrollX = 0;

  const onMoveToSlide = (key) => {
    if (totalSlides === 0) {
      return false;
    }
    scrollRef.current.scrollTo({x: screenWidth * key});
  };

  const onScroll = ({nativeEvent}) => {
    const {width} = nativeEvent.contentSize;
    let {x} = nativeEvent.contentOffset;
    let position = Math.floor(x / (width / totalSlides));
    if (position === preScrollX) {
      return false;
    } else {
      setCurrentSlide(position);
    }
    preScrollX = position;
  };

  const goNext = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide >= totalSlides && onFinish) {
      onFinish();
    } else {
      setCurrentSlide(nextSlide);
      onMoveToSlide(nextSlide);
    }
  };

  return (
    <View style={classes.root}>
      <StatusBar barStyle={'dark-content'} hidden />
      <ScrollView
        bounces={false}
        ref={scrollRef}
        onScroll={onScroll}
        decelerationRate={0.2}
        scrollEventThrottle={8}
        snapToInterval={screenWidth}
        snapToAlignment={'center'}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {slides.map((item, key) => (
          <GuideSlide
            active={currentSlide === key}
            final={currentSlide + 1 === totalSlides}
            isClient={isClient}
            key={`guides-item-${key}`}
            slide={item}
            slideWidth={screenWidth}
            onNext={goNext}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = () => ({
  root: {
    flex: 1,
  },
});

export default GuideSlides;
