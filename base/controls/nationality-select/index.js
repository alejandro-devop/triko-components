import React, {useState} from 'react';
import SelectList from '../select-list';
import {useQuery} from 'react-apollo';
import {GET_COUNTRIES} from './queries';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const NationalitySelect = ({
  label,
  error,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const [countries, setCountries] = useState([]);
  const {loading} = useQuery(GET_COUNTRIES, {
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        setCountries(
          response.map(({id, name: countryName}) => ({
            label: countryName,
            value: id,
          })),
        );
      }
    },
  });
  return loading ? (
    <SkeletonLoader size="xl" />
  ) : (
    <SelectList
      error={error}
      label={label}
      name={name}
      onChange={onChange}
      options={countries}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default NationalitySelect;
