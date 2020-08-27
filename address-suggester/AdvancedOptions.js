import React from 'react';
import TextField from 'shared/components/base/controls/text-field';
import useTranslation from 'hooks/useTranslation';

const AdvancedOptions = ({department, city, onChange}) => {
  const {_t} = useTranslation();
  return (
    <>
      <TextField
        primary
        label={_t('address_suggester_advanced_options_label_1')}
        value={department}
        name="department"
        onChange={onChange}
      />
      <TextField
        label={_t('address_suggester_advanced_options_label_2')}
        primary
        value={city}
        name="city"
        onChange={onChange}
      />
    </>
  );
};

export default AdvancedOptions;
