import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import PreImage from 'shared/components/base/pre-image';

/**
 * Renders previews for post images
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param images
 * @param onViewImage
 * @returns {*}
 * @constructor
 */
const RenderImages = ({images = [], onViewImage}) => {
  const [classes] = useStyles(styles);
  const [imageToRender = {}] = images;
  const handleViewImage = () => {
    if (onViewImage) {
      onViewImage(imageToRender);
    }
  };
  return (
    <TouchableOpacity onPress={handleViewImage} style={classes.root}>
      <PreImage source={{uri: imageToRender.url}} style={classes.image} />
    </TouchableOpacity>
  );
};

RenderImages.propTypes = {
  images: PropTypes.shape({
    url: PropTypes.string,
  }),
  onViewImage: PropTypes.func,
};

export default RenderImages;
