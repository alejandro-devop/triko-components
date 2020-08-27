const handleChange = (value, {name, onChange}) => {
  if (onChange) {
    onChange({target: {name, value}});
  }
};

export default handleChange;
