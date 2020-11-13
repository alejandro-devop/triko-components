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
  avatarWrapperFavor: {
    width: 65,
    height: 65,
  },
  fullName: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
  },
  fullNamePaid: {
    color: '#FFF',
  },
  infoWrapperFavor: {
    alignItems: 'center',
    paddingLeft: 5,
  },
  rating: {
    fontSize: 12,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingWrapperFavor: {
    flexDirection: 'column',
  },
  rateWrapper: {
    backgroundColor: palette.blueAccent,
    paddingHorizontal: 15,
    borderRadius: 40,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  root: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  rootFavor: {
    flexDirection: 'row',
  },
});
