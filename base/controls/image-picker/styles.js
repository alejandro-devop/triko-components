export default ({palette}) => ({
  dialog: {
    height: 250,
  },
  dialogContent: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
  icon: {
    color: '#FFF',
    fontSize: 45,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: palette.blue,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '400',
  },
  root: {},
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  iconSecondary: {
    backgroundColor: palette.orange,
  },
  uploadedLabel: {},
});
