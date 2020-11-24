export default ({palette}) => ({
  actionsWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  cartButtonWrapper: {},
  countText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  countWrapper: {
    backgroundColor: palette.orange,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    right: 0,
    top: 0,
    position: 'absolute',
    zIndex: 1,
    transform: [{translateY: -10}],
  },
  content: {
    flexGrow: 1,
  },
  guideIcon: {
    color: palette.blue,
  },
  guideIconWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  root: {
    flex: 1,
  },
  toolsTitle: {
    textAlign: 'center',
    color: palette.blue,
    fontWeight: '600',
    marginBottom: 20,
  },
  toolsWrapper: {
    paddingHorizontal: 20,
  },
  messageWrapper: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
});
