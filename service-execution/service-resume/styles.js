export default ({palette}) => ({
  root: {
    paddingTop: 60,
    marginTop: -20,
    backgroundColor: '#FFF',
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  priceText: {
    color: palette.blue,
  },
  switchWrapperRow: {
    alignItems: 'center',
  },
  switchWrapper: {
    width: 50,
  },
});
