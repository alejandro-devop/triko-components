export default ({palette, shadows}) => ({
  control: {
    left: 0,
    backgroundColor: '#FFF',
    width: 25,
    height: 25,
    position: 'absolute',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderWidth: 1,
    borderColor: palette.gray,
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
