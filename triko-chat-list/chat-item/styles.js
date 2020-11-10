const avatarSize = 60;

export default ({palette}) => ({
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
    backgroundColor: palette.blueLighter,
  },
  avatarWrapper: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
    marginRight: 20,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: 30,
  },
  root: {
    flexDirection: 'row',
    backgroundColor: palette.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 30,
  },
  rootActive: {
    backgroundColor: palette.orange,
  },
  text: {
    color: palette.blue,
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 2,
  },
  textActive: {
    color: '#FFF',
  },
  textPreview: {
    fontSize: 10,
  },
  timeText: {
    fontSize: 10,
  },
  unReadWrapper: {
    backgroundColor: palette.blue,
    padding: 2,
    minWidth: 20,
    minHeight: 20,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unReadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
