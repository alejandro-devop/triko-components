import React, {useState} from 'react';
import SelectList from 'shared/components/base/controls/select-list';
import {useQuery} from 'react-apollo';
import {GET_ID_TYPES} from './queries';
import useSession from 'hooks/useSession';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const IDTypesSelect = ({
  disabled,
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const [types, setTypes] = useState([]);
  const {stack = {}} = useSession();
  const {locale, regionId} = stack;
  const {loading} = useQuery(GET_ID_TYPES, {
    variables: {
      region: regionId,
      locale,
    },
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        setTypes(
          response.map(({id, name: cityName}) => ({
            label: cityName,
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
      disabled={disabled}
      error={error}
      label={label}
      name={name}
      onChange={onChange}
      options={types}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default IDTypesSelect;
