export default ({palette}) => ({
  fullName: {
    color: palette.orange,
    fontSize: 16,
  },
  avatarWrapper: {
    position: 'absolute',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
    zIndex: 100,
  },
  root: {
    alignItems: 'center',
    height: 70,
    zIndex: 100,
    position: 'relative',
  },
  whiteBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
});
