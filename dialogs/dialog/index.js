import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import DialogBase from 'shared/components/dialogs/dialog-base';
import Text from 'shared/components/base/text';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

/**
 * This component allows to create a simple dialog with title
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param contentStyles
 * @param children
 * @param classes
 * @param open
 * @param onClose
 * @param title
 * @returns {*}
 * @constructor
 */
const Dialog = ({
  contentStyles,
  children,
  disableScroll,
  disableClose,
  disableContent,
  open,
  onClose,
  title,
  loading,
}) => {
  const [classes] = useStyles(styles);
  const WrapperComponent = disableScroll ? View : ScrollView;
  return (
    <DialogBase
      loading={loading}
      disableContent={disableContent}
      contentStyles={contentStyles}
      disableClose
      disableCloseButton={disableClose}
      open={open}
      onClose={onClose}>
      {title && (
        <View style={classes.titleWrapper}>
          <Text variant="subtitle" style={classes.title}>
            {title}
          </Text>
        </View>
      )}
      <WrapperComponent
        style={classes.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={classes.scrollViewContent}>
        {children}
      </WrapperComponent>
    </DialogBase>
  );
};

Dialog.propTypes = {
  animationTypes: PropTypes.oneOf(['none', 'slide', 'fade']),
  contentStyles: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

export default Dialog;
