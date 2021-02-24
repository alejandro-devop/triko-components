import {Platform} from 'react-native';

export default ({palette}) => ({
  actions: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    backgroundColor: palette.blueLight,
    borderRadius: 100,
  },
  buttonIcon: {
    fontSize: 30,
    color: palette.blue,
  },
  buttonLabel: {
    color: palette.blue,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
  },
  otherActions: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  root: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 15,
    marginRight: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  photoWrapper: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{translateX: 20}, {translateY: -10}],
    zIndex: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
      android: {
        fontSize: 14,
      },
    }),
  },
  textRow: {
    marginBottom: 10,
  },
  textWrapper: {
    backgroundColor: palette.blueLight,
    borderRadius: 20,
    minHeight: 200,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  title: {
    color: palette.blue,
    fontWeight: '600',
    marginBottom: 0,
    textAlign: 'center',
  },
});
