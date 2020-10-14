export default ({palette}) => ({
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  label: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '600',
  },
  root: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  wrapper: {
    padding: 10,
    borderRadius: 100,
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
  },
});
