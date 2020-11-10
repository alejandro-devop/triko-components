export default ({palette}) => ({
  icon: {
    position: 'absolute',
    fontSize: 35,
    color: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: palette.red,
    position: 'absolute',
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  root: {
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  rootCollapsed: {
    borderColor: palette.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
