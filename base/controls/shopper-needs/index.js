import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import useMock from 'hooks/useMock';
import mock from './mocks';
import Loader from './Loader';
import Label from 'components/base/label';
import ItemList from './ItemList';
import ViewMore from './ViewMore';

/**
 * This component allows to render the shopper needs
 * @author Jako <jakop.box@gmail.com>
 * @param label
 * @param maxItems
 * @param name
 * @param onChange
 * @param value
 * @param valueKey
 * @returns {*}
 * @constructor
 */
const ShopperNeeds = ({label, maxItems, name, onChange, value, valueKey}) => {
  const [openMore, setOpenMore] = useState(false);
  const [selected, setSelected] = useState(value);
  const {loading, data = {}} = useMock(mock);
  const toggleViewMore = () => setOpenMore(!openMore);
  const onItemsChange = selectedValue => {
    const itemId = selectedValue[valueKey];
    let newSelected = [...selected];
    // If the current item is already selected
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
      <Wrapper>
        <Label secondary>{label}</Label>
        {!loading && (
          <ItemList
            max={maxItems}
            items={data.response}
            toggleMore={toggleViewMore}
            handleChange={onItemsChange}
            selected={selected}
          />
        )}
        {loading && <Loader />}
        <ViewMore
          title={label}
          items={data.response}
          open={openMore}
          onClose={toggleViewMore}
          onDone={toggleViewMore}
          selected={selected}
          handleChange={onItemsChange}
        />
      </Wrapper>
    </>
  );
};

ShopperNeeds.defaultProps = {
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

export default ShopperNeeds;