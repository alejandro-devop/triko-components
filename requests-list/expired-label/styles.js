export default ({palette, variables: {textSmall}}) => ({
  root: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderColor: palette.red,
    borderWidth: 2,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    color: palette.red,
    fontSize: textSmall,
    fontWeight: '600',
  },
});
