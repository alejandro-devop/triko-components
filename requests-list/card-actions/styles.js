export default ({palette, variables: {textSmall, textMedium}}) => ({
  actionsWrapper: {
    justifyContent: 'flex-end',
  },
  altButton: {
    color: palette.green,
  },
  buttonWrapper: {},
  buttonWrapperFirst: {
    marginRight: 20,
  },
  label: {
    color: palette.dark,
    fontSize: 14,
    textAlign: 'center',
  },
  paidInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidTextWrapper: {
    maxWidth: 150,
  },
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#FFF',
    fontSize: textSmall,
    textAlign: 'center',
  },
  textTitle: {
    fontSize: textMedium,
    fontWeight: '600',
  },
  statusWrapper: {
    alignItems: 'flex-end',
  },
});
