import React, {useState} from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import styles from './styles';
import TextField from 'shared/components/base/controls/text-field';
import CircleButton from 'shared/components/base/buttons/circle-button';
import Text from 'shared/components/base/text';
import {isEmpty} from 'shared/utils/functions';
import IconButton from 'shared/components/base/buttons/icon-button';

const TaskToolsWizard = ({name, minChars = 4, onChange, value}) => {
  const [classes] = useStyles(styles);
  const [inputValue, setInputValue] = useState('');
  const [tools, setTools] = useState([]);
  const handleInputChange = ({target: {value: newValue}}) => {
    setInputValue(newValue);
  };

  const handleOnChange = (newTools) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: newTools,
        },
      });
    }
  };

  const handleAdd = () => {
    const newTools = [...tools, inputValue];
    setTools(newTools);
    setInputValue('');
    handleOnChange(newTools);
  };

  const handleRemove = (key) => {
    const newTools = tools.filter((i, k) => k !== key);
    setTools(newTools);
    handleOnChange(newTools);
  };

  return (
    <View style={classes.root}>
      <Text style={classes.title}>required_tools_title</Text>
      <TextField
        primary
        label="tool_name"
        onChange={handleInputChange}
        value={inputValue}
      />
      <View style={classes.actions}>
        <CircleButton
          disabled={isEmpty(inputValue) || inputValue.length < minChars}
          onPress={handleAdd}
          name="plus"
          primary
          size="sm"
        />
      </View>
      <View style={classes.toolsWrapper}>
        {tools.map((toolName, key) => (
          <View style={classes.toolWrapper} key={`tool-${key}`}>
            <Text style={classes.toolText}>{toolName}</Text>
            <IconButton
              name="trash"
              iconStyles={classes.removeButton}
              onPress={() => handleRemove(key)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TaskToolsWizard;
