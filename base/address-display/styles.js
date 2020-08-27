export default ({palette}) => ({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    transform: [{translateX: -25}, {translateY: -50}],
  },
  mapViewWrapper: {
    height: 300,
    width: '100%',
    backgroundColor: 'red',
    // maxHeight: 180,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
