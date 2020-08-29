import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import useStyles from 'shared/hooks/use-styles';
import {countries} from 'countries-list';
import Filter from './Filter';
import {isEmpty} from 'shared/utils/functions';
import CountryItem from './CountryItem';

const countryKeys = Object.keys(countries);
const countriesMap = countryKeys.map(key => ({
  key,
  ...countries[key],
}));

const getFilteredCountries = (filter, available = []) => {
  let filteredCountries = [
    ...countriesMap.filter(country => available.includes(country.key)),
  ];
  if (!isEmpty(filter)) {
    filteredCountries = filteredCountries.filter(item => {
      const regExp = new RegExp(`.*(${filter.toLowerCase()}).*`, 'g');
      return `${item.name.toLowerCase()}`.match(regExp);
    });
  }
  return filteredCountries;
};

const CountriesList = ({
  disableOnClose,
  open,
  onSelect,
  available = [],
  onClose,
  displayLang,
  title,
}) => {
  const [classes] = useStyles(styles);
  const [filter, setFilter] = useState('');
  const countriesToMap = getFilteredCountries(filter, available);
  return (
    <Dialog
      disableClose={disableOnClose}
      disableScroll
      contentStyles={classes.dialog}
      open={open}
      onClose={onClose}
      title={title}>
      <Filter onChange={setFilter} />
      <ScrollView>
        {countriesToMap.map((country, key) => {
          return (
            <CountryItem
              key={`country-${key}`}
              onPress={() => onSelect(country)}
              country={country.key}
              name={
                displayLang
                  ? `(${country.languages[0]}) - ${country.native}`
                  : country.native
              }
            />
          );
        })}
      </ScrollView>
    </Dialog>
  );
};

const styles = () => ({
  dialog: {
    height: '70%',
  },
  root: {},
});

export default CountriesList;
