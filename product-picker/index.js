import React, {useState} from 'react';
import {Platform} from 'react-native';
import Control from './InputControl';
import ProductsDialog from './ProductsDialog';

const ProductPicker = ({
  label,
  name,
  onChange,
  value,
  placeholder,
  primary,
  secondary,
  selected = [],
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(value);
  const toggleOpen = () => setOpen(!open);

  const handleChange = product => {
    setSelectedProduct(product);
    toggleOpen();
    if (onChange) {
      onChange({
        target: {
          name,
          value: product,
        },
      });
    }
  };

  return (
    <>
      <Control
        onPress={toggleOpen}
        label={label}
        placeholder={placeholder}
        primary={primary}
        secondary={secondary}
        value={selectedProduct}
      />
      {open && (
        <ProductsDialog
          label={label}
          placeholder={placeholder}
          selected={selectedProduct}
          open={open}
          onSelect={handleChange}
          onClose={toggleOpen}
          disabledProducts={selected}
        />
      )}
    </>
  );
};

export default ProductPicker;
