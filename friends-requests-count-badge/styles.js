const size = 28;
export default ({palette}) => ({
  icon: {
    color: '#FFF',
  },
  iconWrapper: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    backgroundColor: palette.blueDark,
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.6)',
    borderWidth: 2,
    borderColor: palette.blueDark,
    borderRadius: 40,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    color: palette.blue,
    fontWeight: '600',
  },
  textLabel: {
    color: palette.blue,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  textWrapper: {
    paddingHorizontal: 10,
  },
  wrapper: {
    alignItems: 'center',
  },
});
