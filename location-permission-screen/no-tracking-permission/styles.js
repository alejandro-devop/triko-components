export default ({palette}) => ({
  caret: {
    width: 10,
    height: 10,
    backgroundColor: palette.gray,
    borderRadius: 100,
    marginRight: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    width: '100%',
    maxHeight: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionsButtons: {
    alignItems: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  permissionDescription: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});
