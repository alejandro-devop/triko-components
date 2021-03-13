import React, {useMemo} from 'react';
import SelectList from 'shared/components/base/controls/select-list';
import {useQuery} from 'react-apollo';
import SkeletonLoader from 'shared/components/loaders/skeleton';
import useTranslation from 'hooks/useTranslation';
import {GET_CITIES} from './queries';

const CitySelect = ({
  country,
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const {_t} = useTranslation();
  const {data = {}, loading} = useQuery(GET_CITIES, {
    variables: {
      countryId: country,
      size: 20000,
      page: 1,
    },
    fetchPolicy: 'no-cache',
  });
  const {cities = []} = data.response || {};
  const memorizedCities = useMemo(
    () =>
      cities.map(({id, name: cityName}) => ({
        label: cityName,
        value: id,
      })),
    [cities],
  );
  return loading ? (
    <SkeletonLoader
      size="xl"
      withLoader
      loaderPlaceholder={_t('Loading cities')}
    />
  ) : (
    <SelectList
      error={error}
      enableFilter
      label={label}
      name={name}
      onChange={onChange}
      options={memorizedCities}
      placeholder={placeholder}
      value={value}
      maxRecords={20}
      {..._props}
    />
  );
};

export default React.memo(CitySelect);
