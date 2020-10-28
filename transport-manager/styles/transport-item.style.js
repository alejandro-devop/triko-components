export default ({palette}) => ({
  icon: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: palette.blue1,
    marginRight: 20,
  },
  itemRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: palette.grayLighter,
    borderRadius: 40,
  },
  checkIcon: {
    color: '#FFF',
  },
  checkWrapper: {
    width: 40,
    height: 40,
    backgroundColor: palette.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  textWrapper: {
    flex: 1,
  },
});
