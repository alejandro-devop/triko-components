export default ({palette, variables: {cornerRadius}}) => ({
  floatingActions: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    top: '85%',
  },
  root: {
    backgroundColor: palette.blueLightAccent1,
    borderBottomLeftRadius: cornerRadius,
    borderBottomRightRadius: cornerRadius,
    zIndex: -1,
  },
  wrapper: {
    paddingVertical: 10,
    minHeight: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
});
