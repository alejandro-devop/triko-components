export default ({palette, variables: {textMedium, textLarge}}) => ({
  text: {
    fontSize: textMedium,
    textAlign: 'center',
    fontWeight: '600',
  },
  primary: {
    color: palette.blue,
  },
  root: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
  },
  secondary: {
    color: palette.orange,
  },
  title: {
    color: palette.orange,
    fontSize: textLarge,
    fontWeight: '700',
  },
});
