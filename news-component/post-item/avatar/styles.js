const size = 35;
export default ({palette}) => ({
  text: {
    color: palette.blue,
    fontSize: 14,
    fontWeight: '600',
  },
  textTime: {
    fontSize: 12,
  },
  textWhite: {
    color: '#FFF',
  },
  textTitle: {
    fontSize: 12,
  },
  heading: {
    justifyContent: 'center',
    paddingLeft: size,
    marginBottom: 5,
  },
  image: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: size,
    height: size,
    marginRight: 20,
    position: 'absolute',
    borderWidth: 2,
    borderColor: palette.blueDark,
    borderRadius: 100,
    left: 10,
    top: 10,
  },
  fullNameWrapper: {},
  root: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
});
