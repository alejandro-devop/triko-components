import React, {useState} from 'react';
import Wrapper from './wrapper';
import Label from '../label';
import SliderLoader from 'components/base/loaders/slider-loader';
import ItemsSlider from 'shared/components/base/items-slider';
import BuildingItem from './building-item';
import styles from './styles';
import useStyles from 'hooks/useStyles';
import {useBuildingTypesList} from './hooks';
import {isEmpty} from 'shared/utils/functions';

/**
 * Component to render a slider picker to select home types.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param name
 * @param onChange
 * @param valueKey
 * @param label
 * @param value
 * @returns {*}
 * @constructor
 */
const HomePickerType = ({name, onChange, valueKey = 'id', label, value}) => {
  const [classes] = useStyles(styles);
  const [selectedIndex, setSelectedIndex] = useState();
  const [loading, setLoading] = useState(true);
  const {homeTypes} = useBuildingTypesList({
    onCompleted: (items = []) => {
      const [firstItem] = items;
      if (!isEmpty(firstItem) && isEmpty(value)) {
        handleSelect(firstItem);
      } else if (!isEmpty(value)) {
        setSelectedIndex(
          items.findIndex((item) => item.id === parseInt(value, 10)),
        );
      }
      setLoading(false);
    },
  });
  const handleSelect = (selectedItem) => {
    if (onChange && selectedItem) {
      onChange({
        target: {name, value: selectedItem[valueKey]},
        entity: selectedItem,
      });
    }
  };
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      {loading && <SliderLoader />}
      {!loading && (
        <ItemsSlider
          guideIcon="hand-pointer"
          disableSnap
          items={homeTypes}
          SliderComponent={BuildingItem}
          wrapperClass={classes.wrapper}
          onSelectItem={handleSelect}
          selectedIndex={selectedIndex}
        />
      )}
    </Wrapper>
  );
};

export default HomePickerType;
