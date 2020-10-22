import DeviceInfo from 'react-native-device-info';

const borderRadius = 40;

export default ({palette}) => ({
  slideBackground: {
    position: 'absolute',
    width: '91%',
    height: '100%',
    top: 20,
    left: 0,
    resizeMode: 'cover',
  },
  innerContent: {
    flex: 1,
    paddingTop: '5%',
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    backgroundColor: palette.orangeLighter,
    paddingVertical: 20,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerClient: {
    backgroundColor: palette.blueLight,
  },
  logo: {
    width: 130,
    height: 80,
    resizeMode: 'contain',
  },
  logoWrapper: {
    marginTop: DeviceInfo.hasNotch() ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: palette.orange,
    flex: 1,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  mainClient: {
    backgroundColor: palette.blue,
  },
  subtitle: {
    color: palette.orange,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  titleIcon: {
    width: 35,
    height: 35,
    marginLeft: 5,
  },
  titleWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: palette.blueLighter,
  },
  slide: {
    flex: 1,
  },
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingBottom: 50,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    paddingTop: borderRadius,
  },
});
