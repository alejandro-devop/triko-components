export default ({palette}) => ({
  priceWrapper: {
    backgroundColor: palette.blueAccent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    borderRadius: 40,
    marginTop: 5,
  },
  priceText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#FFF',
  },
  root: {
    marginVertical: 10,
  },
  totalText: {
    fontSize: 14,
    color: palette.black,
  },
});
