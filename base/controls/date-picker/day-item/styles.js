export default ({palette}) => ({
  root: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: palette.blue,
  },
  disabled: {
    opacity: 0.2,
  },
  text: {
    color: palette.gray,
    textAlign: 'center',
  },
  textSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
});
