export default ({palette}) => ({
  avatar: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: palette.gray,
  },
  fullName: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  root: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});
