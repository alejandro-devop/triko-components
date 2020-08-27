import React from 'react';
import ImageIcon from 'shared/components/base/image-icon';
import useStyles from 'shared/hooks/use-styles';

const ItemIcon = ({icon}) => {
  const [classes] = useStyles(styles);
  return (
    <ImageIcon
      source={{uri: icon}}
      imageClass={classes.image}
      wrapperClass={classes.root}
    />
  );
};

const styles = ({palette}) => ({
  root: {
    backgroundColor: '#FFF',
    borderColor: palette.grayLighter,
    padding: 10,
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default ItemIcon;
