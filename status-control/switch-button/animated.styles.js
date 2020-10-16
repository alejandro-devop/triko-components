import palette from 'themes/styles/palette';

export default {
  container: (animation, {active, disabled}) => ({
    alignItems: 'center',
    backgroundColor: disabled
      ? palette.grayLight
      : animation.interpolate({
          inputRange: [0, 1],
          outputRange: [palette.greenLight, palette.green],
        }),
    height: 20,
    borderRadius: 25,
    justifyContent: 'center',
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: !active ? palette.grayLight : palette.gray,
  }),
  text: (inverted, animation, pos = 10) => ({
    color: !inverted ? '#FFF' : palette.gray,
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: inverted ? [1, 0] : [0, 1],
    }),
    transform: [{translateY: inverted ? pos : -pos}],
  }),
};
