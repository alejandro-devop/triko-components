import React from 'react';
import PropTypes from 'prop-types';
import useMock from 'shared/hooks/use-mock';
import mock from './mocks';
import Loader from './Loader';
import ItemList from './ItemList';
import Label from 'shared/components/base/label';
import useMarketCategories from 'shared/components/base/controls/shopper-needs/hooks';

const ShopperNeedsHorizontal = ({
  label,
  maxItems,
  name,
  onChange,
  required,
  value = [],
  valueKey,
}) => {
  const {loading, categories} = useMarketCategories();

  const handleItemChange = (selected) => {
    const {id} = selected;
    let newSelected = [...value];
    if (value.includes(id)) {
      newSelected = value.filter((item) => item !== id);
    } else {
      newSelected.push(id);
    }
    if (onChange) {
      onChange({
        target: {
          name,
          value: newSelected,
        },
      });
    }
  };
  return (
    <>
      {Boolean(label) && <Label required={required}>{label}</Label>}
      {!loading && (
        <ItemList
          max={maxItems}
          items={categories}
          selected={value}
          handleChange={handleItemChange}
          valueKey={valueKey}
        />
      )}
      {loading && <Loader />}
    </>
  );
};

ShopperNeedsHorizontal.defaultProps = {
  labelKey: 'name',
  maxItems: 6,
  value: [],
  valueKey: 'id',
};

PropTypes.propTypes = {
  label: PropTypes.string,
  maxItems: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.number),
  valueKey: PropTypes.string,
};

export default ShopperNeedsHorizontal;
