import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Option from './Option';
import {optionListStyles} from './styles';
import {useStyles} from '@triko-app/hooks';
import FilterBar from 'shared/components/base/filter-bar';
import CircleButton from 'shared/components/base/buttons/circle-button';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component allows to render a the select list items
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param empty
 * @param title
 * @param open
 * @param onClose
 * @param onSelect
 * @param options
 * @returns {*}
 * @constructor
 */
const OptionsList = ({
  disableEmpty,
  empty = false,
  title,
  labelKey,
  multiple,
  enableFilter,
  maxRecords = 40,
  open,
  onClose,
  onSelect,
  options = [],
}) => {
  const [classes] = useStyles(optionListStyles);
  const {_t} = useTranslation();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const totalRecords = options.length;

  const handleSelect = (selectedItem) => {
    if (multiple) {
      let newValues = [...selectedValues];
      if (selectedValues.includes(selectedItem.value)) {
        newValues = selectedValues.filter(
          (item) => item !== selectedItem.value,
        );
      } else {
        newValues.push(selectedItem.value);
      }
      setSelectedValues(newValues);
    } else if (onSelect) {
      onSelect(selectedItem);
    }
  };

  const handleAccept = () => {
    if (onSelect) {
      onSelect(selectedValues);
    }
  };

  const onScroll = ({nativeEvent}) => {
    const {contentOffset, contentSize} = nativeEvent;
    const {y = 0} = contentOffset;
    const {height} = contentSize;
    const offset = 400;
    // console.log('y: ', y, ' height: ', height);
    if (y + offset >= height) {
      // console.log('Should fetch more!');
      setPage(page + 1);
    }
  };

  const getFilteredOptions = useMemo(
    () => () => {
      let filteredOptions = [...options];
      if (query) {
        filteredOptions = filteredOptions.filter((item) => {
          const exp = new RegExp(`.*(${query.toLowerCase()}).*`, 'g');
          return `${item[labelKey].toLowerCase()}`.match(exp);
        });
      }
      return filteredOptions.slice(0, maxRecords * page);
    },
    [options, query, page],
  );
  const optionsToDisplay = getFilteredOptions();
  return (
    <Dialog
      contentStyles={classes.contentStyles}
      open={open}
      onClose={onClose}
      title={title}>
      {enableFilter && (
        <FilterBar
          primary
          onChange={(value) => setQuery(value)}
          placeholder={_t('filter_text')}
          alwaysVisible
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={4}
        onScroll={onScroll}>
        {empty && (
          <Option
            value=""
            label={_t(empty)}
            onPress={() => {
              if (onSelect) {
                onSelect(null);
              }
              setSelectedValues([]);
            }}
          />
        )}
        {optionsToDisplay.map((item, key) => (
          <Option
            key={`item-${item.value}-${key}`}
            label={item.label}
            icon={item.icon}
            selected={selectedValues.includes(item.value)}
            onPress={() => handleSelect(item)}
          />
        ))}
      </ScrollView>
      {multiple && selectedValues.length > 0 && (
        <View style={classes.buttonAccept}>
          <CircleButton name="check" primary onPress={handleAccept} />
        </View>
      )}
    </Dialog>
  );
};

OptionsList.propTypes = {
  empty: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  title: PropTypes.string,
};

export default OptionsList;
