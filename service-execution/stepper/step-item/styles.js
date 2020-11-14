export default ({palette, variables: {textSmall}}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    zIndex: 1000,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    position: 'absolute',
    borderWidth: 2,
    borderColor: palette.blue,
    right: 0,
    borderRadius: 100,
    transform: [{translateX: 7}],
  },
  descriptionText: {
    fontSize: textSmall,
    paddingHorizontal: 2,
    textAlign: 'center',
  },
  confirmLabel: {
    fontSize: textSmall,
  },
  icon: {
    color: palette.grayLight,
    fontSize: 30,
    marginRight: 10,
  },
  iconActive: {
    color: palette.green,
  },
  flag: {
    width: 30,
    height: 30,
    left: 4,
  },
  flagFirst: {
    bottom: 12,
  },
  flagEnd: {
    top: 12,
  },
  leftPanel: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightPanel: {
    flex: 5,
  },
  root: {
    flexDirection: 'row',
  },
  stepDescription: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    flex: 1,
    fontSize: textSmall,
    marginVertical: 15,
  },
  timeLine: {
    width: 6,
    position: 'absolute',
    height: '100%',
    backgroundColor: palette.blueLightAccent,
    right: 4.5,
    top: '50%',
    zIndex: -1,
  },
  timelineCollapsed: {
    top: 0,
  },
  title: {
    color: palette.blueDark,
    fontWeight: '600',
  },
  description: {
    color: palette.gray,
  },
  tip: {
    backgroundColor: palette.blueLightAccent,
    position: 'absolute',
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 100,
  },
});
