export default ({palette}) => ({
  actions: {
    marginTop: 50,
    paddingHorizontal: 40,
  },
  allDayWrapper: {
    width: 60,
  },
  error: {
    color: palette.red,
    textAlign: 'center',
  },
  errorWrapper: {
    marginTop: 20,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  timeRowItem: {
    flex: 1,
  },
  timeRowItemFirst: {
    marginRight: 5,
  },
  timeRowItemLast: {
    marginLeft: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
