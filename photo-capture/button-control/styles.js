export default ({palette}) => ({
  button: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.blue,
  },
  buttonWrapper: {
    flex: 2,
  },
  labelWrapper: {
    flex: 6,
  },
  icon: {
    color: '#FFF',
    fontSize: 40,
  },
  label: {
    color: palette.blue,
  },
  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 10,
  },
});
