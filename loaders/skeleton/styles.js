export default ({palette}) => ({
  wrapper: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  root: {
    backgroundColor: palette.blue1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
  },
  loaderIndicator: {
    flexDirection: 'row',
  },
  loaderPlaceholder: {
    flex: 1,
    paddingLeft: 20,
    color: palette.blue,
  },
  bar: {
    width: '100%',
    height: 40,
    borderRadius: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  square: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  circleXs: {
    width: 20,
    height: 20,
  },
  circleSm: {
    width: 30,
    height: 30,
  },
  circleLg: {
    width: 50,
    height: 50,
  },
  squareXs: {
    borderRadius: 5,
    width: 20,
    height: 20,
  },
  squareSm: {
    width: 30,
    height: 30,
  },
  squareLg: {
    width: 50,
    height: 50,
  },
  barXs: {
    height: 20,
  },
  barSm: {
    height: 30,
  },
  barLg: {
    height: 50,
  },
  barXl: {
    height: 60,
    marginTop: 15,
  },
  loader: {},
});
