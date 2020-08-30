import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useMock from 'hooks/useMock';
import mock from './mocks';
import Loader from './Loader';
import ItemList from './ItemList';

const ShopperNeedsHorizontal = ({
  maxItems,
  name,
  onChange,
  value,
  valueKey,
}) => {
  const [selected, setSelected] = useState(value);
  const {loading, data = {}} = useMock(mock);

  const handleItemChange = (selectedValue = 0) => {
    const itemId = selectedValue[valueKey];
    let newSelected = [...selected];
    if (selected.includes(itemId)) {
      newSelected = selected.filter(item => item !== itemId);
    } else {
      newSelected = [...selected, itemId];
    }
    setSelected(newSelected);
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
      {!loading && (
        <ItemList
          max={maxItems}
          items={data.response}
          selected={selected}
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
