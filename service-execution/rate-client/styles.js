export default ({variables: {cornerRadius}}) => ({
  ratingWrapper: {
    alignItems: 'center',
  },
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 60,
    marginTop: -40,
    borderBottomRightRadius: cornerRadius,
    borderBottomLeftRadius: cornerRadius
  },
  buttonRow: {
    marginTop: 20,
  },
});
