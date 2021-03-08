import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Button from './Button';
import useStyles from 'shared/hooks/use-styles';
import Label from 'shared/components/base/label';
import useTranslation from 'shared/hooks/use-translate';

/**
 * This component allows to render switch button
 * @author Jako <jakop.box@gmail.com>
 * @param buttons
 * @param label
 * @param name
 * @param onChange
 * @param value
 * @returns {*}
 * @constructor
 */
const SwitchButton = ({buttons, label, name, onChange, value}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const handleChange = (index) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: index,
        },
      });
    }
  };
  return (
    <View styles={classes.root}>
      {label && <Label secondary>{label}</Label>}
      <View style={classes.buttonsWrapper}>
        {buttons.map((buttonText, key) => (
          <Button
            active={value === key}
            key={`switch-button-${key}`}
            onPress={() => handleChange(key)}>
            {_t(buttonText)}
          </Button>
        ))}
      </View>
    </View>
  );
};

SwitchButton.defaultProps = {
  buttons: [],
};

SwitchButton.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

const styles = ({}) => ({
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default SwitchButton;
