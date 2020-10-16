export default ({palette, variables: {textMedium}}) => ({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flex: 1,
    backgroundColor: palette.blue,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonActive: {
    backgroundColor: palette.orange,
  },
  buttonText: {
    color: '#FFF',
    fontSize: textMedium,
    fontWeight: '600',
  },
  root: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
