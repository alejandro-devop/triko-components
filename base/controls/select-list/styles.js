export const optionStyles = ({palette}) => ({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: palette.grayLight,
    borderBottomWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: palette.blue1,
    borderBottomColor: palette.blue,
  },
  text: {
    color: palette.black,
  },
  iconContainer: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.grayLighter,
    borderRadius: 100,
    marginRight: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 7,
  },
});

export const optionListStyles = {
  contentStyles: {
    maxHeight: '80%',
    minHeight: 500,
  },
  buttonAccept: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
};
