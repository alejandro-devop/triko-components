const size = 35;
export default ({palette}) => ({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: palette.blue,
    borderRadius: 100,
    marginRight: 10,
    width: size,
    height: size,
  },

  buttonWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#FFF',
    transform: [{translateX: 5}, {translateY: -5}],
    backgroundColor: '#FFF',
  },
  bubbleWrapper: {
    backgroundColor: palette.blueLight,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 15,
  },
  commentWrapper: {
    flex: 1,
  },
  root: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textAvatar: {
    color: palette.blueDark,
    fontWeight: '600',
    marginLeft: 10,
  },
  textElapsed: {
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 10,
  },
  text: {
    fontSize: 14,
  },
});
