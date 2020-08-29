import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Icon from 'shared/components/base/icon';
import TextField from 'shared/components/base/controls/text-field';
import PrependControl from './PrependControl';
import CountriesList from 'shared/components/base/countries-list';
import useRegionConfig from 'hooks/useRegionConfig';

/**
 * This component allows to render a input which displays a country list,
 * when an item is selected it returns an event with the following information:
 * {
 *   target: {
 *     name: string,
 *      code: string,       // Co
 *      region: string,     // es-CO
 *      phoneCode: string,  // 57
 *   }
 * }
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param label
 * @param name
 * @param onChange
 * @param placeholder
 * @param required
 * @param onClose
 * @returns {*}
 * @constructor
 */
const CountryInput = ({
  label,
  name,
  onChange,
  onClose,
  placeholder,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const {availableCountries} = useRegionConfig();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const toggleOpen = () => setOpen(!open);
  const handleSelect = (data = {}) => {
    const {key, languages = [], phone, native} = data;
    const [language] = languages;
    const region = `${language}-${key}`;
    const newValue = {
      name: native,
      code: key,
      region,
      phoneCode: phone,
    };
    setSelectedCountry(newValue);
    toggleOpen();
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    }
  };
  const handleClose = () => {
    toggleOpen();
    if (onClose) {
      onClose();
    }
  };
  const {code: countryCode, name: countryName = ''} = selectedCountry || {};
  return (
    <>
      <TextField
        addOn={<Icon name="chevron-down" />}
        label={label}
        placeholder={placeholder}
        prependControl={<PrependControl country={countryCode} />}
        onlyMask
        primary
        required={required}
        onPress={toggleOpen}
        value={countryName}
      />
      {open && (
        <CountriesList
          title={label}
          available={availableCountries}
          onSelect={handleSelect}
          open={open}
          onClose={handleClose}
          toggle={toggleOpen}
        />
      )}
    </>
  );
};

CountryInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default CountryInput;
