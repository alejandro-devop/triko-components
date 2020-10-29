import React from 'react';
import Wrapper from './wrapper';
import Form from './form';
import useNavigate from 'shared/hooks/use-navigate';
import {useEventSave} from './hooks';
import {LoadingCurtain} from 'components/base/dialogs';

/**
 * This component renders handles the add event.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {*}
 * @constructor
 */
const AddEvent = () => {
  const {navigation} = useNavigate();
  const {loading, saveEvent} = useEventSave();

  const onCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async (form) => {
    await saveEvent(form);
    navigation.replace('my-agenda');
  };

  return (
    <>
      <Wrapper>
        <Form onCancel={onCancel} onSubmit={handleSubmit} />
      </Wrapper>
      {loading && <LoadingCurtain />}
    </>
  );
};

export default AddEvent;
