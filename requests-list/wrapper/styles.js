export default ({variables}) => ({
  contentWrapper: {
    paddingVertical: variables.padding4,
  },
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    borderTopStartRadius: variables.cornerRadius,
    borderTopEndRadius: variables.cornerRadius,
  },
});
