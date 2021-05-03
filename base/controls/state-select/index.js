import React, {useState} from 'react';
import SelectList from '../select-list';
import {useQuery} from 'react-apollo';
import {GET_STATES} from './queries';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const StateSelect = ({
  label,
  error,
  name,
  onChange,
  placeholder,
  value,
  country,
  ..._props
}) => {
  const [values, setValues] = useState([]);
  const {loading} = useQuery(GET_STATES, {
    variables: {
      country,
    },
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        setValues(
          response.map(({id, name: valName}) => ({
            label: valName,
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
      enableFilter
      maxRecords={20}
      label={label}
      name={name}
      onChange={onChange}
      options={values}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default StateSelect;
