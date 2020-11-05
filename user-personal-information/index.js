import React from 'react';
import PropTypes from 'prop-types';
import Form from './pi-form';
import usePIForm from 'hooks/usePIForm';
import usePISave from 'shared/components/user-personal-information/hooks';
import {LoadingCurtain} from 'components/base/dialogs';

/**
 * This component allows to render the user personal information form and controls the information
 * submit.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param isTriko
 * @param updateWorkflow
 * @returns {*}
 * @constructor
 */
const UserPersonalInformation = ({isTriko, updateWorkflow}) => {
  const {form, formErrors, isValid, loading, onChange} = usePIForm();
  const {sendRequest, loading: saving} = usePISave({isTriko, updateWorkflow});
  const handleSubmit = async () => {
    await sendRequest(form, () => {});
  };
  return (
    <>
      {!saving && (
        <Form
          form={form}
          errors={formErrors}
          isValid={isValid}
          loading={loading}
          onChange={onChange}
          onSubmit={handleSubmit}
        />
      )}
      {saving && <LoadingCurtain />}
    </>
  );
};

UserPersonalInformation.proptypes = {
  isTriko: PropTypes.bool,
  updateWorkflow: PropTypes.bool,
};

export default UserPersonalInformation;
