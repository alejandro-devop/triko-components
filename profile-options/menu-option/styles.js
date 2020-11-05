export default ({palette, variables: {textMedium}}) => ({
  optionText: {
    color: palette.blue,
    fontSize: textMedium,
    fontWeight: '600',
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    backgroundColor: palette.blueLighter,
    borderBottomColor: palette.blueLight,
    borderRadius: 40,
    marginBottom: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '100%',
  },
});
