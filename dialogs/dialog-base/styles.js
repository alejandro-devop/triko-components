import {Dimensions, Platform} from 'react-native';
const buttonSize = 35;

export const closeButtonStyles = ({palette}) => ({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: buttonSize,
    height: buttonSize,
    borderRadius: 100,
    ...Platform.select({
      android: {
        borderRadius: 100,
        borderColor: palette.blue,
        backgroundColor: '#FFF',
        borderWidth: 2,
      },
      ios: {
        backgroundColor: palette.blue,
      },
    }),
  },
  icon: {
    ...Platform.select({
      ios: {
        color: '#FFF',
      },
      android: {
        color: palette.blue,
      },
    }),
  },
  wrapper: {
    position: 'absolute',
    right: 5,
    top: 0,
    transform: [{translateX: buttonSize / 4}, {translateY: -(buttonSize / 4)}],
    zIndex: 100,
  },
});
const screenHeight = Dimensions.get('window').height;
export const dialogStyles = ({palette, shadows}) => ({
  backDrop: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },
  contentWrapper: {
    padding: 20,
    paddingHorizontal: 5,
    width: '95%',
    maxHeight: '80%',
    maxWidth: '95%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    ...shadows.shadow4,
    zIndex: 2,
    ...Platform.select({
      ios: {
        height: '50%',
      },
      android: {
        height: screenHeight - 20,
        maxHeight: screenHeight - 50,
      },
    }),
  },
  scrollContainer: {
    flex: 1,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 100,
  },
});
