export default ({palette, variables: {textExtraSmall}}) => ({
  icon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  root: {
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
  },
  rootAccepted: {
    backgroundColor: palette.orange,
  },
  rootPaid: {
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  textPaid: {
    color: palette.orange,
    fontSize: 10,
  },
});
