import React from 'react';
import {View} from 'react-native';
import useStyles from 'hooks/useStyles';
import ImageIcon from 'components/ImageIcon';
import bellIcon from 'assets/icons/bell.png';

/**
 * This component renders the wrapper presentation for the notifications stack.
 * @param children
 * @returns {*}
 * @constructor
 */
const Wrapper = ({children}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <View style={classes.iconWrapper}>
        <ImageIcon
          wrapperClass={classes.imageWrapper}
          source={bellIcon}
          style={classes.icon}
        />
      </View>
      {children}
    </View>
  );
};

const styles = ({palette, shadows}) => ({
  root: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 110,
  },
  icon: {},
  imageWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 100,
    marginBottom: 5,
    ...shadows.shadow3,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Wrapper;
