import {Platform} from 'react-native';

export default ({palette}) => ({
  label: {
    color: palette.blue,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontSize: 18,
      },
    }),
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    minHeight: 300,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 40,
    paddingVertical: 20,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.blue,
    borderRadius: 100,
    marginRight: 20,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.blue,
    borderRadius: 40,
    marginBottom: 10,
  },
  itemsWrapper: {
    paddingHorizontal: 20,
  },
});
