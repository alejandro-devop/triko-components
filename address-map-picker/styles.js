import {Platform} from 'react-native';
export default ({palette}) => ({
  root: {
    flex: 1,
    minHeight: 500,
    borderRadius: 10,
  },
  mapViewWrapper: {
    maxHeight: '100%',
    width: '100%',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        height: 500,
      },
      android: {
        height: 450,
      },
    }),
  },
  rootEditing: {
    paddingTop: 30,
  },
  mapView: {
    width: '100%',
    height: Platform.select({ios: '100%', android: '100%'}),
    borderRadius: 10,
  },
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    transform: [{translateX: -25}, {translateY: -50}],
  },
  addressDisplay: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    minHeight: 120,
  },
  addressTextWrapper: {
    justifyContent: 'center',
    flex: 7,
  },
  addressActionsWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressDisplayText: {
    color: palette.orange,
    textAlign: 'center',
  },
  footerButton: {
    position: 'absolute',
    backgroundColor: '#FFF',
    bottom: 0,
    width: '100%',
    height: 100,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
