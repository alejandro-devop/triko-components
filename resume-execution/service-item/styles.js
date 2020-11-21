export default ({palette, variables: {textSmall}}) => ({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
  },
  clockWrapper: {
    flexDirection: 'row',
    width: 60,
  },
  iconButton: {
    color: '#FFF',
  },
  rateText: {
    color: palette.orange,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  rateWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 4,
    width: 20,
  },
  root: {
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  serviceIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  serviceIconWrapper: {
    width: 45,
    height: 45,
  },
  serviceInfoWrapper: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  serviceText: {
    color: '#FFF',
    fontSize: textSmall,
    fontWeight: '600',
  },
  text: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: textSmall,
  },
  timeIcon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 5,
  },
  timeInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  trikoWrapper: {
    alignItems: 'center',
  },
});
