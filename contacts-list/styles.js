const avatarSize = 30;
export default ({palette}) => ({
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: palette.blue,
    borderRadius: 100,
    marginRight: 20,
  },
  filterWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.blueLight,
    borderRadius: 12,
  },
  legendText: {
    fontSize: 12,
    textAlign: 'center',
    color: palette.gray,
  },
  legendWrapper: {
    marginBottom: 5,
  },
  root: {
    flex: 1,
  },
  textName: {
    fontSize: 16,
  },
  textPhone: {
    color: palette.gray,
    fontSize: 12,
  },
  textWrapper: {
    flex: 1,
  },
});
