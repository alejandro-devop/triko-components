const barsCommons = {
  borderRadius: 30,
  position: 'absolute',
};

export default stepSize => ({palette}) => ({
  progressBar: {
    ...barsCommons,
    backgroundColor: palette.orange,
    height: 5,
  },
  progressTrack: {
    ...barsCommons,
    backgroundColor: palette.blue,
    width: '100%',
    height: 2.5,
  },
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  step: {
    borderRadius: 100,
    width: stepSize,
    height: stepSize,
    backgroundColor: palette.blue,
  },
  stepActive: {
    backgroundColor: palette.orange,
  },
  stepsWrapper: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: palette.orange,
    textAlign: 'center',
  },
});
