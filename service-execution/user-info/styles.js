export default ({palette, variables: {textSmall}}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: palette.blueLight,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  fullName: {
    fontWeight: '600',
  },
  rateText: {
    color: '#FFF',
    fontWeight: '600',
  },
  rateWrapper: {
    backgroundColor: palette.orange,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
  root: {
    marginTop: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: textSmall,
    textAlign: 'center',
  },
});
