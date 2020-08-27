import React, {useState} from 'react';
import SelectList from 'shared/components/base/controls/select-list';
import {useQuery} from '@apollo/react-hooks';
import {GET_CONVEYANCES} from './queries';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import useSession from 'hooks/useSession';

const ConveyancePicker = ({
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const [conveyances, setConveyances] = useState([]);
  const {stack = {}} = useSession();
  const {locale} = stack;
  const {loading} = useQuery(GET_CONVEYANCES, {
    variables: {
      locale,
    },
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        setConveyances(
          response.map(({id, name: countryName, icon}) => ({
            label: countryName,
            value: id,
            icon,
          })),
        );
      }
    },
  });
  return loading ? (
    <SkeletonLoader size="xl" />
  ) : (
    <SelectList
      multiple
      iconKey="icon"
      error={error}
      label={label}
      name={name}
      onChange={onChange}
      options={conveyances}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default ConveyancePicker;
