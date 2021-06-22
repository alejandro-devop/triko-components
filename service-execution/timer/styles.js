export default ({palette, variables: {textMedium}}) => ({
  actions: {
    marginTop: 20,
  },
  durationText: {
    textAlign: 'center',
    fontSize: textMedium,
    color: palette.orange,
  },
  overPassedLabel: {
    color: palette.red,
    fontSize: textMedium,
    fontWeight: '600',
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  seconds: {
    textAlign: 'right',
    marginBottom: 14,
    fontSize: 32,
    width: 50,
  },
  text: {
    color: palette.blue,
    fontWeight: '600',
  },
  time: {
    fontSize: 80,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
