export default ({palette}) => ({
  bottomRow: {},
  mapView: {
    height: 340,
  },
  marker: {
    position: 'absolute',
    top: 170,
    left: '50%',
    width: 50,
    height: 50,
    transform: [{translateX: -25}, {translateY: -50}],
  },
  placeholder: {
    color: palette.blue,
    textAlign: 'center',
    fontSize: 16,
  },
  root: {
    marginTop: 10,
  },
  topPlaceholder: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
