export default ({variables: {cornerRadius}}) => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexGrow: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: cornerRadius,
    borderTopRightRadius: cornerRadius,
  },
});
