export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: palette.blueLight,
  },
  infoWrapper: {
    alignItems: 'center',
    marginLeft: 10,
  },
  rateWrapper: {
    backgroundColor: palette.orange,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  textRating: {
    fontSize: 18,
  },
});
