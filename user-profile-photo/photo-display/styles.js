import {Platform} from 'react-native';

export default ({palette}) => ({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{translateX: 20}],
  },
  image: {
    borderRadius: 200,
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: 70,
    height: 70,
    padding: 5,
    borderRadius: 200,
    backgroundColor: palette.blue2,
    marginBottom: 2,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginTop: 20,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  nameText: {
    color: palette.blue,
    fontSize: 16,
    fontWeight: '600',
  },
  nameTextTriko: {
    color: palette.orange,
  },
  nameWrapper: {},
  wrapperLg: {
    width: 150,
    height: 150,
  },
  wrapperXl: {
    width: 250,
    height: 250,
  },
  root: {
    alignItems: 'center',
  },
  rootTriko: {
    backgroundColor: palette.orangeLighter,
  },
});
