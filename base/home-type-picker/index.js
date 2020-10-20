import React from 'react';
import Wrapper from './wrapper';
import Label from '../label';
import SliderLoader from 'components/base/loaders/slider-loader';
import ItemsSlider from 'shared/components/base/items-slider';
import BuildingItem from './building-item';
import styles from './styles';
import useStyles from 'hooks/useStyles';
import {useQuery} from '@apollo/react-hooks';
import {GET_BUILDING_TYPES} from './queries';
import {useSession} from 'hooks/index';

/**
 * This component allows to select a home building type
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param name
 * @param onChange
 * @param valueKey
 * @param label
 * @returns {*}
 * @constructor
 */
const HomePickerType = ({name, onChange, valueKey = 'id', label}) => {
  const [classes] = useStyles(styles);
  const {
    stack: {locale},
  } = useSession();
  const {loading, data = {}} = useQuery(GET_BUILDING_TYPES, {
    variables: {
      locale,
    },
    onCompleted: ({response}) => {
      if (response.length > 0) {
        const [first] = response;
        handleSelect(first);
      }
    },
  });

  const homeTypes = data.response ? data.response : [];
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
        />
      )}
    </Wrapper>
  );
};

export default HomePickerType;
