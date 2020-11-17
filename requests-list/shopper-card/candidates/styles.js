export default ({palette, variables: {textMedium, textSmall}}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarBorder: {
    borderWidth: 2,
    borderColor: palette.blueLight,
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  avatarWrapper: {
    borderRadius: 100,
    width: 25,
  },
  root: {},
  emptyWrapper: {
    alignItems: 'center',
    borderColor: palette.blueLightAccent,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: palette.blueLightAccent,
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
    width: 150,
  },
  maxText: {
    fontSize: textSmall,
    color: '#FFF',
    fontWeight: '600',
  },
  maxWrapper: {
    position: 'absolute',
    backgroundColor: palette.orange,
    zIndex: 100,
    right: 0,
    transform: [{translateX: 25}, {translateY: 8}],
    padding: 4,
    borderRadius: 100,
  },
  emptyText: {
    color: '#FFF',
    flex: 1,
    fontSize: textMedium,
    fontWeight: '600',
  },
  trikosRow: {
    flexDirection: 'row',
  },
  trikoAvatarWrapper: {},
  trikoAvatar: {
    width: 50,
    height: 50,
  },
});
