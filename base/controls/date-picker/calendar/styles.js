import {Platform} from 'react-native';

export default ({palette}) => ({
  root: {
    backgroundColor: palette.white,
    marginBottom: 350,
  },
  day: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWrapper: {
    flexDirection: 'row',
  },
  offset: {
    width: Platform.select({ios: 50, android: 40}),
  },
  daysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  icon: {
    color: '#FFF',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  monthText: {
    flex: 1,
    color: palette.gray,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 12,
  },
  yearText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: Platform.select({ios: 20, android: 16}),
  },
  yearWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  monthTouch: {
    flex: 1,
    flexDirection: 'row',
  },
  monthWrapper: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
  },
});
