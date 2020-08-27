import React, {useState} from 'react';
import SelectList from '../select-list';
import {useQuery} from 'react-apollo';
import {GET_GENDERS} from './queries';
import useSession from 'hooks/useSession';
import SkeletonLoader from 'shared/components/loaders/skeleton';

const GendersSelect = ({
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const [genders, setGenders] = useState([]);
  const {stack = {}} = useSession();
  const {locale, regionId} = stack;
  const {loading} = useQuery(GET_GENDERS, {
    variables: {
      region: regionId,
      locale,
    },
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        setGenders(
          response.map(({id, name: genderName}) => ({
            label: genderName,
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
      label={label}
      name={name}
      error={error}
      onChange={onChange}
      options={genders}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default GendersSelect;
