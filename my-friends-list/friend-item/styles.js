const size = 40;
export default ({palette}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    height: size,
    width: size,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: palette.blueDark,
    marginRight: 10,
  },
  buttonWrapper: {
    backgroundColor: palette.blue,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    top: 0,
    borderWidth: 3,
    borderColor: '#FFF',
    transform: [{translateX: 6}, {translateY: -4}],
  },
  icon: {
    color: '#FFF',
  },
  label: {
    color: palette.blue,
    fontSize: 18,
    fontWeight: '600',
  },
  root: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: palette.blueLight,
    marginBottom: 10,
  },
});
