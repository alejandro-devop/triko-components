import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextField from 'shared/components/base/controls/text-field';
import IconButton from 'shared/components/base/buttons/icon-button';
import OptionsList from './OptionsList';
import ItemIcon from 'shared/components/base/controls/select-list/ItemIcon';

/**
 * This component allows to create a select box.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param empty
 * @param label
 * @param disabled
 * @param disableEmpty
 * @param error
 * @param enableFilter
 * @param multiple
 * @param required
 * @param maxRecord
 * @param labelKey
 * @param name
 * @param placeholder
 * @param options
 * @param iconKey
 * @param onChange
 * @param value
 * @param valueKey
 * @returns {*}
 * @constructor
 */
const SelectList = ({
  disabled,
  disableEmpty,
  error,
  enableFilter,
  empty,
  label,
  iconKey,
  labelKey = 'label',
  name,
  placeholder,
  options = [],
  onChange,
  multiple,
  required,
  maxRecords = 40,
  value = '',
  valueKey = 'value',
  primary,
  secondary,
  help,
  helpText,
}) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!opened);
  const selectedValue = options.find((item) => item[valueKey] === value) || {};
  const handleOnChange = (selectedItem = {}) => {
    if (onChange) {
      let newValue = null;
      if (multiple) {
        newValue = selectedItem; // When multiple we receive an array.
      } else {
        newValue = selectedItem ? selectedItem[valueKey] : null;
      }
      onChange({
        target: {
          name,
          value: newValue,
          item: selectedItem,
        },
      });
    }
    toggleOpened();
  };

  const getDisplayValue = () => {
    if (multiple) {
      return options
        .filter((item) => (value || []).includes(item.value))
        .map((item) => item.label)
        .join(', ');
    } else {
      return selectedValue[labelKey] || '';
    }
  };

  return (
    <>
      <TextField
        error={error}
        disabled={disabled}
        preOn={
          iconKey &&
          multiple &&
          Boolean(selectedValue[iconKey]) && (
            <ItemIcon icon={selectedValue[iconKey]} />
          )
        }
        addOn={
          !disabled && <IconButton onPress={toggleOpened} name="chevron-down" />
        }
        placeholder={placeholder}
        editable={false}
        primary={primary}
        label={label}
        onlyMask
        onPress={toggleOpened}
        required={required}
        value={getDisplayValue()}
        help={help}
        helpText={helpText}
        secondary={secondary}
      />
      {opened && (
        <OptionsList
          disableEmpty={disableEmpty}
          empty={empty}
          multiple={multiple}
          enableFilter={enableFilter}
          labelKey={labelKey}
          maxRecords={maxRecords}
          open={opened}
          onClose={toggleOpened}
          title={placeholder}
          onSelect={handleOnChange}
          options={options.map((item) => ({
            label: item[labelKey],
            value: item[valueKey],
            icon: item.icon,
          }))}
        />
      )}
    </>
  );
};

SelectList.propTypes = {
  empty: PropTypes.string, // Text to be used as empty item.
  label: PropTypes.string, // Label to be used for the input
  labelKey: PropTypes.string, // Key to be used to extract label from options.
  name: PropTypes.string, // Key to reference the input.
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  valueKey: PropTypes.string, // Key to be used to extract value from options.
};

export default SelectList;
