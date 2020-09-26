export default ({palette}) => ({
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
  button: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    flex: 1,
  },
  label: {
    fontWeight: '400',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  removeWrapper: {
    width: 80,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  iconSecondary: {
    backgroundColor: palette.orange,
  },
  uploadedLabel: {},
});
