export default ({palette, variables: {cornerRadius}}) => ({
  content: {
    flexGrow: 1,
    backgroundColor: palette.blueLight,
  },
  root: {
    backgroundColor: palette.blueLight,
    paddingTop: 20,
    flexGrow: 1,
    paddingBottom: 40,
  },
  tip: {
    backgroundColor: palette.blueLight,
    borderBottomRightRadius: cornerRadius,
    borderBottomLeftRadius: cornerRadius,
    position: 'absolute',
    top: '100%',
    minHeight: 40,
    width: '100%',
    zIndex: 10,
  },
});
