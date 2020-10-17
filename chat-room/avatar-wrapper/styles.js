import {Platform} from 'react-native';

export default ({palette}) => ({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    minHeight: 80,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  label: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  root: {
    zIndex: 3,
    backgroundColor: palette.blueLightAccent,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#FFF',
    //     shadowOffset: {
    //       width: 0,
    //       height: 40,
    //     },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 16.0,
    //   },
    //   android: {
    //     borderBottomColor: palette.grayLighter,
    //     borderBottomWidth: 1,
    //   },
    // }),
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  textWrapper: {
    flex: 1,
  },
});
