import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, Image, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import Text from 'shared/components/base/text';
import useDimensions from 'shared/hooks/use-dimensions';
import PreImage from 'shared/components/base/pre-image';

const ImagePreview = ({url}) => {
  const [classes] = useStyles(styles);
  const [layoutWidth, setLayoutWidth] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const {screenH} = useDimensions();

  const onLayout = ({nativeEvent = {}}) => {
    const {width} = nativeEvent.layout;
    setLayoutWidth(width);
    handleGetImagesSizes(width);
  };

  const handleGetImagesSizes = (lWidth) => {
    Image.getSize(url, (width, height) => {
      setImageWidth(width);
      setImageHeight(height);
      if (height > width) {
        setIsPortrait(true);
      }
      setLoaded(true);
    });
  };

  const newHeight = (imageHeight / imageWidth) * layoutWidth;

  return (
    <View style={[classes.root, {minHeight: 100}]} onLayout={onLayout}>
      {loaded && !isNaN(newHeight) && (
        <PreImage
          source={{uri: url}}
          style={[
            classes.image,
            {
              height: newHeight,
            },
          ]}
        />
      )}
    </View>
  );
};

export default ImagePreview;
