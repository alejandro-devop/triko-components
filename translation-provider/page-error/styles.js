import {StyleSheet} from 'react-native';

const palette = {
  grayLight: '#c9c9c9',
  grayLighter: '#e1e1e1',
  gray: '#787878',
};

export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    flex: 1,
  },
  icon: {
    color: palette.gray,
  },
  text: {
    color: palette.gray,
  },
  iconWrapper: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: palette.grayLighter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 15,
  },
});
