import React, {useState} from 'react';
import Control from './Control';
import CountriesList from 'shared/components/base/countries-list';

const availableCountries = ['CO', 'US'];

const CountryPicker = ({
  onChange,
  available = availableCountries,
  displayLang,
  primaryButton,
  value,
  transparent,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(value);
  const [openList, setOpenList] = useState(false);
  const toggleList = () => setOpenList(!openList);
  const handleSelect = (country) => {
    const {key} = country;
    setSelectedCountry(key);
    toggleList();
    if (onChange) {
      onChange(country);
    }
  };
  return (
    <>
      <Control
        transparent={transparent}
        primaryButton={primaryButton}
        country={selectedCountry}
        onPress={toggleList}
      />
      {openList && (
        <CountriesList
          onSelect={handleSelect}
          open={openList}
          toggle={toggleList}
          displayLang={displayLang}
          available={available}
        />
      )}
    </>
  );
};

export default CountryPicker;
