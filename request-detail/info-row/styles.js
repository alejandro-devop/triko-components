export default ({palette}) => ({
  label: {
    fontWeight: '600',
    color: palette.gray,
    flex: 1,
  },
  icon: {
    color: palette.blue,
    marginLeft: 10,
  },
  iconOffset: {
    width: 20,
  },
  root: {
    backgroundColor: palette.grayLighter,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  value: {
    color: palette.blue,
    flex: 1,
    fontWeight: '600',
    textAlign: 'right',
  },
});
