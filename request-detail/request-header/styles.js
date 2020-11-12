export default ({palette}) => ({
  animWrapper: {
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    width: 60,
    height: 60,
  },
  pendingText: {
    color: palette.gray,
    fontSize: 16,
  },
  root: {
    backgroundColor: palette.blue,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  statusAnimWrapper: {
    zIndex: 900,
  },
  statusWrapper: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    top: -10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: palette.grayLighter,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  serviceWrapper: {
    flex: 1,
  },
  serviceName: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 17,
  },
  serviceCategory: {
    color: '#FFF',
    fontSize: 14,
  },
  trikoWrapper: {
    flex: 1,
  },
});
