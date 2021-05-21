import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, ScrollView, View} from 'react-native';
import SliderItem from './SliderItem';
import CursorRight from 'shared/components/anims/AnimatedArrowRight';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const defaultElements = 3;
const screenWidth = Dimensions.get('window').width;

/**
 * This component renders a slider with items that can be selectable.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param elements
 * @param items
 * @param SliderComponent
 * @param itemStyles
 * @param onSelectItem
 * @param disableSnap
 * @param disableGuide
 * @param itemProps
 * @param wrapperClass
 * @param guideOffset
 * @param selectedIndex
 * @param containerStyles
 * @param guideIcon
 * @returns {*}
 * @constructor
 */
const ItemsSlider = ({
  elements = defaultElements,
  items = [],
  SliderComponent,
  itemStyles,
  onSelectItem,
  disableSnap,
  disableGuide,
  itemProps,
  wrapperClass,
  guideOffset = 30,
  containerStyles,
  selectedIndex = 0,
  guideIcon = 'chevron-right',
}) => {
  const [classes] = useStyles(styles);
  const scrollRef = useRef(null);
  let preScrollX = 0;
  const [selected, setSelected] = useState(selectedIndex);
  const shouldDisplayGuide = items.length >= elements;
  const [guideVisible, setGuideVisible] = useState(shouldDisplayGuide);
  const [width, setWidth] = useState(null);
  const elementWidth = screenWidth / elements;

  const onScroll = ({nativeEvent}) => {
    let {x} = nativeEvent.contentOffset;
    if (x - guideOffset > 0 && guideVisible) {
      setGuideVisible(false);
    } else if (x - guideOffset <= 0 && !guideVisible) {
      setGuideVisible(true);
    }
    if (disableSnap) {
      return null;
    }
    let position = Math.floor(x / (width / elements));
    if (position === preScrollX) {
      return false;
    }
    preScrollX = position;
    // setSelected(position);
    // if (onSelectItem) {
    //   onSelectItem(items.find((i, k) => k === position));
    // }
  };

  const onScrollLayout = ({nativeEvent: {layout}}) => setWidth(layout.width);
  const onSelectSlide = (key) => {
    if (disableSnap) {
      setSelected(key);
    } else {
      setSelected(key);
      onMoveToSlide(key);
    }
    if (onSelectItem) {
      onSelectItem(items[key]);
    }
  };
  const onMoveToSlide = (key) => {
    const totalItems = items.length;
    if (totalItems === 0) {
      return false;
    }
    scrollRef.current.scrollTo({x: elementWidth * key});
  };

  useEffect(() => {
    if (onSelectItem) {
      onSelectItem(items[selected]);
    }
  }, []);

  const defaultStyles = {
    paddingLeft: !disableSnap ? elementWidth : 0,
    paddingRight: !disableSnap ? elementWidth : 0,
    paddingVertical: 15,
  };
  return (
    <View style={wrapperClass}>
      <ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate={0.2}
        scrollEventThrottle={8}
        snapToInterval={!disableSnap ? elementWidth : null}
        snapToAlignment={!disableSnap ? 'center' : null}
        contentContainerStyle={[defaultStyles, containerStyles]}
        onLayout={onScrollLayout}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}>
        {items.map((item, key) => (
          <SliderItem
            key={`items-key${key}`}
            itemWidth={elementWidth}
            selected={key === selected}
            itemKey={key}
            item={item}
            itemProps={itemProps}
            onSelect={() => onSelectSlide(key)}
            itemStyles={itemStyles}
            Component={SliderComponent}
          />
        ))}
      </ScrollView>
      {shouldDisplayGuide && guideVisible && !disableGuide && (
        <CursorRight icon={guideIcon} style={classes.cursorWrapper} />
      )}
    </View>
  );
};

ItemsSlider.propTypes = {
  elements: PropTypes.number,
  items: PropTypes.array,
  SliderComponent: PropTypes.any,
  itemStyles: PropTypes.any,
  onSelectItem: PropTypes.func,
  disableSnap: PropTypes.bool,
  disableGuide: PropTypes.bool,
  itemProps: PropTypes.any,
  wrapperClass: PropTypes.any,
  guideOffset: PropTypes.number,
  guideIcon: PropTypes.string,
};

export default ItemsSlider;
