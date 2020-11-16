import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import useMock from 'hooks/useMock';
import mock from './mocks';
import Loader from './Loader';
import Label from 'components/base/label';
import ItemList from './ItemList';
import ViewMore from './ViewMore';
import useMarketCategories from 'shared/components/base/controls/shopper-needs/hooks';

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
  const {categories = [], loading} = useMarketCategories();
  const selected = [...value];
  const toggleViewMore = () => setOpenMore(!openMore);
  const onItemsChange = (selectedValue) => {
    const itemId = selectedValue[valueKey];
    let newSelected = [...selected];
    // If the current item is already selected
    if (selected.includes(itemId)) {
      newSelected = selected.filter((item) => item !== itemId);
    } else {
      newSelected = [...selected, itemId];
    }
    if (onChange) {
      onChange({
        target: {
          name,
          value: categories.filter((item) => newSelected.includes(item.id)),
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
            items={categories}
            toggleMore={toggleViewMore}
            handleChange={onItemsChange}
            selected={selected}
          />
        )}
        {loading && <Loader />}
        <ViewMore
          title={label}
          items={categories}
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
