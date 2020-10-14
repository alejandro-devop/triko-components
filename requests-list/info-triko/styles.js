export default ({palette}) => ({
  avatar: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: palette.blueLight,
    marginRight: 20,
    width: 65,
    height: 65,
  },
  infoWrapper: {
    alignItems: 'center',
  },
  fullName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingText: {
    color: '#FFF',
    fontWeight: '800',
  },
  ratingWrapper: {
    paddingHorizontal: 14,
    backgroundColor: palette.orange,
    marginVertical: 5,
    borderRadius: 40,
  },
  root: {
    flexDirection: 'row',
  },
});
