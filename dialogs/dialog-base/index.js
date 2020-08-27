import React from 'react';
import PropTypes from 'prop-types';
import {Modal, TouchableOpacity, Platform, View} from 'react-native';
import {dialogStyles as styles} from './styles';
import CloseButton from './CloseButton';
import useStyles from 'shared/hooks/use-styles';
import useKeyboard from 'shared/hooks/use-keyboard';
import LoaderScreen from 'shared/components/loaders/loader-screen';

/**
 * This component allows to render a dialog base which handles the close
 * action and basic structure.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props
 */
const DialogBase = props => {
  const {
    animationType = 'fade',
    backdropStyles,
    contentStyles,
    disableClose,
    disableCloseButton,
    children,
    disableContent,
    open,
    onClose,
    loading,
    detectKeyboard,
  } = props;
  const [classes] = useStyles(styles);
  const [visibleKeyboard, keyBoardHeight] = useKeyboard();
  const content = (
    <>
      {!disableContent && (
        <View
          style={[
            classes.contentWrapper,
            contentStyles,
            detectKeyboard && visibleKeyboard
              ? Platform.select({
                  ios: {},
                  android: {
                    paddingTop: keyBoardHeight,
                  },
                })
              : {},
          ]}>
          {!disableCloseButton && <CloseButton onPress={onClose} />}
          {children}
        </View>
      )}
      {disableContent && children}
      {loading && (
        <View style={classes.loader}>
          <LoaderScreen text={false} />
        </View>
      )}
    </>
  );
  return (
    <Modal
      animationType={animationType}
      onRequestClose={!disableClose ? onClose : null}
      transparent
      modal={classes.modal}
      visible={open}>
      {!disableClose && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={[classes.backDrop, backdropStyles]}>
          {content}
        </TouchableOpacity>
      )}
      {disableClose && (
        <View style={[classes.backDrop, backdropStyles]}>{content}</View>
      )}
    </Modal>
  );
};

DialogBase.propTypes = {
  animationTypes: PropTypes.oneOf(['none', 'slide', 'fade']),
  backdropStyles: PropTypes.any,
  contentStyles: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DialogBase;
