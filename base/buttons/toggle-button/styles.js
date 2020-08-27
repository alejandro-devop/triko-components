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
    borderWidth: 1,
    borderColor: palette.grayLight,
    ...shadows.shadow1,
  },
  icon: {
    fontSize: 16,
  },
  root: {},
});
