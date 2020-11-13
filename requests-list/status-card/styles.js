export default ({palette, variables: {textExtraSmall}}) => ({
  icon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  root: {
    marginBottom: 5,
    alignItems: 'center',
  },
  rootPaid: {
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: '#FFF',
  },
  textPaid: {
    color: palette.orange,
    fontSize: textExtraSmall,
    fontWeight: '600',
  },
});
