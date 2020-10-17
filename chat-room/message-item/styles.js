export default ({palette, shadows}) => ({
  root: {
    marginVertical: 10,
  },
  isLoading: {
    opacity: 0.4,
  },
  loaderWrapper: {
    alignItems: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  messageBubble: {
    backgroundColor: palette.blue2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  contentWrapper: {
    maxWidth: '80%',
    flexDirection: 'row',
  },
  itsMe: {
    alignItems: 'flex-end',
  },
  myMessage: {
    backgroundColor: palette.blueDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
  },
  myMessageText: {
    color: '#FFF',
  },
  meContainer: {
    flexDirection: 'row-reverse',
  },
  avatarWrapper: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 100,
    transform: [{translateY: -25}],
    ...shadows.shadow1,
  },
  avatar: {
    borderRadius: 100,
    marginTop: 5,
  },
  message: {
    fontSize: 17,
  },
  carretLeft: {
    width: 0,
    height: 0,
    borderBottomWidth: 10,
    borderTopWidth: 0,
    borderRightWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: palette.blue2,
    borderTopColor: 'transparent',
  },
  carretRight: {
    width: 0,
    height: 0,
    borderBottomWidth: 10,
    borderTopWidth: 0,
    borderLeftWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: palette.blueDark,
    borderTopColor: 'transparent',
  },
});
