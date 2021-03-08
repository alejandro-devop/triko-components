import {isEmpty} from 'shared/utils/functions';

export const getDefaultValues = (defaultValues, defaultQuery) => {
  let newValues = {
    address: null,
    type: null,
    name: null,
    description: null,
    city: defaultQuery,
  };
  if (!isEmpty(defaultValues) && !isEmpty(defaultValues.address)) {
    const [address, ...city] = defaultValues.address.split(', ');
    newValues = {
      address: {
        primaryText: address,
      },
      city: city.join(', '),
      name: defaultValues.title,
      description: defaultValues.description,
      type: defaultValues.type.id,
    };
  }
  return newValues;
};
