export default ({variables}) => ({
  contentWrapper: {
    paddingHorizontal: variables.padding1,
    paddingVertical: variables.padding4,
  },
  root: {
    backgroundColor: '#FFF',
    borderTopStartRadius: variables.cornerRadius,
    borderTopEndRadius: variables.cornerRadius,
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    borderTopStartRadius: variables.cornerRadius,
    borderTopEndRadius: variables.cornerRadius,
  },
});
