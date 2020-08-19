import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Form from './Form';

/**
 * This component allows to report bugs
 * @author Jako <jakop.box@gmail.com>
 * @param {*} param0
 */
const BugReporter = ({open, onClose, onSuccess}) => {
  const onSubmit = () => {
    console.log('data');
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <Wrapper open={open} onClose={onClose}>
      <Form onSubmit={onSubmit} />
    </Wrapper>
  );
};

BugReporter.propTypes = {
  onSuccess: PropTypes.func,
};

export default BugReporter;
