export default ({palette, variables: {textMedium}}) => ({
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
  instructionsContent: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  instructionsContentInner: {
    backgroundColor: palette.blueLightAccent,
    padding: 20,
    borderRadius: 20,
  },
  instructionsText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: textMedium,
  },
  instructionsTitle: {
    color: palette.blue,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: textMedium,
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
});
