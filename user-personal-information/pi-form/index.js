import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import DatePicker from 'components/base/controls/date-picker';
import TextField from 'components/base/controls/text-field';
import NationalitySelect from 'main/components/base/controls/nationality-select';
import CitySelect from 'main/components/base/controls/city-select';
import IDTypesSelect from 'main/components/base/controls/id-types-select';
import GendersSelect from 'main/components/base/controls/genders-select';
import useTranslation from 'shared/hooks/use-translate';
import RequiredLabel from 'components/base/commons/RequiredLabel';
import Button from 'components/base/buttons/button';
import styles from './styles';
import {useStyles} from '@triko-app/hooks';
import {LoadingCurtain} from 'components/base/dialogs';
import StateSelect from 'shared/components/base/controls/state-select';

/**
 * This component only renders the personal information form (Presentation)
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param onChange
 * @param blockedFields
 * @param errors
 * @param form
 * @param onSubmit
 * @param onCancel
 * @param isValid
 * @param loading
 * @returns {*}
 * @constructor
 */
const PIForm = ({
  onChange,
  blockedFields = [],
  errors = {},
  form = {},
  onSubmit,
  onCancel,
  isValid,
  loading,
}) => {
  const {
    birthDate,
    city,
    idType,
    identification,
    firstName,
    lastName,
    gender,
    state,
    nationality,
  } = form;
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  return (
    <>
      <View style={classes.root}>
        <RequiredLabel />
        <NationalitySelect
          primary
          error={errors.nationality}
          label={_t('register_wizard_services_prsl_info_label_1')}
          name="nationality"
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_1')}
          required
          value={nationality}
        />
        {Boolean(nationality) && (
          <StateSelect
            primary
            error={errors.state}
            label={_t('register_wizard_services_prsl_info_label_state')}
            name="state"
            country={nationality}
            onChange={onChange}
            placeholder={_t('register_wizard_services_prsl_info_state_ph')}
            required
            value={state}
            help={_t('help_text_why_do_we_need_this')}
            helpText={_t('state_help_text')}
          />
        )}
        {Boolean(nationality) && (
          <CitySelect
            disabled={!state}
            primary
            error={errors.city}
            label={_t('register_wizard_services_prsl_info_label_2')}
            name="city"
            state={state}
            country={nationality}
            onChange={onChange}
            placeholder={_t('register_wizard_services_prsl_info_ph_2')}
            required
            value={city}
          />
        )}
        <IDTypesSelect
          primary
          error={errors.idType}
          label={_t('register_wizard_services_prsl_info_label_4')}
          name="idType"
          disabled={blockedFields.includes('idType')}
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_4')}
          required
          value={idType}
        />
        <TextField
          primary
          error={errors.identification}
          label={_t('register_wizard_services_prsl_info_label_5')}
          name="identification"
          disabled={blockedFields.includes('identification')}
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_5')}
          required
          value={identification}
        />
        <TextField
          primary
          error={errors.firstName}
          label={_t('register_wizard_services_prsl_info_label_10')}
          name="firstName"
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_10')}
          required
          value={firstName}
        />
        <TextField
          primary
          error={errors.lastName}
          label={_t('register_wizard_services_prsl_info_label_11')}
          name="lastName"
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_11')}
          required
          value={lastName}
        />
        <GendersSelect
          primary
          error={errors.gender}
          label={_t('register_wizard_services_prsl_info_label_7')}
          name="gender"
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_7')}
          value={gender}
        />
        <DatePicker
          primary
          error={errors.birthDate}
          label={_t('register_wizard_services_prsl_info_label_8')}
          name="birthDate"
          disabled={blockedFields.includes('birthDate')}
          onChange={onChange}
          placeholder={_t('register_wizard_services_prsl_info_ph_8')}
          required
          value={birthDate}
        />
        <View style={classes.buttonWrapper}>
          <Button primary disabled={!isValid} onPress={onSubmit}>
            {_t('save_text')}
          </Button>
          {onCancel && <Button onPress={onCancel}>{_t('cancel_text')}</Button>}
        </View>
      </View>
      {loading && <LoadingCurtain />}
    </>
  );
};

PIForm.propTypes = {
  onChange: PropTypes.func,
  blockedFields: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.oneOfType([PropTypes.object]),
  form: PropTypes.oneOfType([PropTypes.object]),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isValid: PropTypes.bool,
  loading: PropTypes.bool,
};

export default PIForm;
