export default ({palette, variables: {cornerRadius, textMedium}}) => ({
  actionsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  boxWrapper: {
    alignItems: 'center',
    width: '90%',
    minHeight: 100,
    flexDirection: 'row',
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: palette.blue,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  boxWrapperCollapsed: {
    width: 70,
    minHeight: 80,
  },
  root: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    zIndex: 2000,
  },
  text: {
    color: '#FFF',
    fontSize: textMedium,
    textAlign: 'center',
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
