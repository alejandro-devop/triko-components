import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'components/base/dialogs/dialog';

/**
 * This component handles the Wrapper or container for the bug reporter form
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0
 */
const Wrapper = ({children, open, onClose}) => (
  <Dialog open={open} onClose={onClose} title={'Report bug'}>
    {children}
  </Dialog>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Wrapper;
