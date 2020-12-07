import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Form from './Form';
import {useSendSupportMessage} from './hooks';
import {LoadingCurtain} from 'components/base/dialogs';

/**
 * This component allows to report bugs
 * @author Jako <jakop.box@gmail.com>
 * @param {*} param0
 */
const BugReporter = ({open, disableDialog, onClose, onSuccess}) => {
  const [saved, setSaved] = useState(false);
  const {loading, sendReport} = useSendSupportMessage();
  const onSubmit = async (form) => {
    await sendReport(form);
    setSaved(true);
    if (onSuccess) {
      onSuccess();
    }
    if (onClose) {
      onClose();
    }
  };

  const content = <Form onSubmit={onSubmit} saved={saved} />;

  return (
    <>
      {disableDialog ? (
        content
      ) : (
        <Wrapper open={open} onClose={onClose}>
          {content}
        </Wrapper>
      )}
      {loading && <LoadingCurtain />}
    </>
  );
};

BugReporter.propTypes = {
  onSuccess: PropTypes.func,
};

export default BugReporter;
