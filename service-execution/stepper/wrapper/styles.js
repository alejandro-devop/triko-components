export default () => ({
  root: {
    flexDirection: 'row',
    marginTop: -20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  rootCollapsed: {
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  tip: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 40,
    position: 'absolute',
    top: '100%',
    zIndex: -1,
  },
});
