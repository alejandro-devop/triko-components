export default ({palette, variables: {textSmall}}) => ({
  contentWrapper: {
    backgroundColor: palette.grayLighter,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: textSmall,
    color: palette.gray,
  },
  descriptionSubtitleText: {
    fontSize: textSmall,
  },
  descriptionWrapper: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: -20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 25,
    zIndex: -1,
  },
  label: {
    fontWeight: '600',
    color: palette.gray,
    flex: 1,
  },
  icon: {
    color: palette.blue,
    marginLeft: 10,
  },
  iconOffset: {
    width: 20,
  },
  root: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  value: {
    color: palette.blue,
    flex: 1,
    fontWeight: '600',
    textAlign: 'right',
  },
});
