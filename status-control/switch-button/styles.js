export default ({palette, shadows}) => ({
  control: {
    left: 0,
    backgroundColor: '#FFF',
    width: 30,
    height: 30,
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderWidth: 3,
    borderColor: palette.black,
    ...shadows.shadow1,
  },
  controlActive: {
    borderColor: palette.grayLight,
    backgroundColor: palette.grayLighter,
  },
  icon: {
    fontSize: 16,
  },
  root: {},
});
