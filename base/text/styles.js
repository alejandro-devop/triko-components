import {Platform} from 'react-native';
export default ({palette}) => ({
  paragraph: {
    fontSize: Platform.select({
      ios: 20,
      android: 14,
    }),
    fontWeight: '300',
  },
  title: {
    color: palette.orange,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: 25,
        fontWeight: '300',
        marginTop: 10,
        marginBottom: 20,
      },
      android: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 5,
        marginBottom: 10,
      },
    }),
  },
  titlePrimary: {
    color: palette.blue,
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: Platform.select({
    ios: {
      fontSize: 25,
      fontWeight: '300',
    },
    android: {
      fontSize: 20,
      fontWeight: '200',
    },
  }),
  link: {
    textDecorationLine: 'underline',
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  caption: {
    color: palette.gray,
    fontSize: 15,
  },
});
