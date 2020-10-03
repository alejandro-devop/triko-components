import React, {useState} from 'react';
import SelectList from '../select-list';
import {GET_BANKS} from './queries';
import {useQuery} from '@apollo/react-hooks';
import useSession from 'shared/hooks/use-session-triko';
import SkeletonLoader from 'shared/components/loaders/skeleton';

/**
 * This component allows to render a bank list input
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param error
 * @param label
 * @param name
 * @param onChange
 * @param placeholder
 * @param value
 * @param _props
 * @returns {*}
 * @constructor
 */
const BankInput = ({
  error,
  label,
  name,
  onChange,
  placeholder,
  value,
  ..._props
}) => {
  const [banks, setBanks] = useState([]);
  const {stack = {}} = useSession();
  const {locale, regionId} = stack;
  const {loading} = useQuery(GET_BANKS, {
    variables: {
      region: regionId,
      locale,
    },
    onCompleted: ({response}) => {
      if (Array.isArray(response)) {
        const [, ...bankList] = response;
        setBanks(
          bankList.map(({bankCode, bankName}) => ({
            label: bankName,
            value: bankCode,
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
      enableFilter
      onChange={onChange}
      options={banks}
      placeholder={placeholder}
      value={value}
      {..._props}
    />
  );
};

export default BankInput;
