import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default ({palette, variables: {cornerRadius, textSmall}}) => ({
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  panel: {},
  root: {
    backgroundColor: palette.green,
    top: 0,
    width: '100%',
    zIndex: 2,
  },
  text: {
    color: '#FFF',
    fontSize: textSmall,
    textAlign: 'right',
  },
  textTitle: {
    fontWeight: '600',
  },
  tip: {
    position: 'absolute',
    width: '100%',
    height: 40,
    borderBottomRightRadius: cornerRadius,
    borderBottomLeftRadius: cornerRadius,
    backgroundColor: palette.green,
    zIndex: -1,
    ...Platform.select({
      ios: DeviceInfo.hasNotch()
        ? {
            top: '120%',
          }
        : {
            top: '100%',
          },
      android: DeviceInfo.hasNotch()
        ? {top: '100%'}
        : {
            top: '100%',
          },
    }),
  },
});
