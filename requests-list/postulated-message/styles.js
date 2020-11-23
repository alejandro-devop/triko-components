export default ({palette}) => ({
  postulatedWrapper: {
    position: 'absolute',
    // left: '50%',
    right: 0,
    top: 0,
    transform: [{translateX: 10}, {translateY: -10}],
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: palette.orange,
  },
  postulatedText: {
    color: palette.orange,
    fontSize: 12,
    fontWeight: '600',
  },
});
