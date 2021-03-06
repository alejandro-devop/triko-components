import React, {useState} from 'react';
import {Platform} from 'react-native';
import Control from './InputControl';
import ProductsDialog from './ProductsDialog';
import {add} from 'react-native-reanimated';

const ProductPicker = ({
  addLabel = 'add_new_product_text',
  label,
  name,
  onChange,
  value,
  placeholder,
  primary,
  secondary,
  selected = [],
  categories = [],
  market = {},
}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(value);
  const toggleOpen = () => setOpen(!open);

  const handleChange = (product) => {
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
          addLabel={addLabel}
          market={market}
          categories={categories}
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
