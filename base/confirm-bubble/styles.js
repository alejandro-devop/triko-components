export default ({palette, variables: {textMedium}}) => ({
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRoot: {
    marginHorizontal: 30,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
    left: 20,
    transform: [{translateY: -35}],
  },
  label: {
    color: '#FFF',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    fontSize: textMedium,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 10,
  },
  root: {
    backgroundColor: palette.orange,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 40,
    paddingVertical: 20,
    borderRadius: 60,
  },
});
