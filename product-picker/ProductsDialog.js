import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import TextField from 'components/base/controls/text-field';
import {useStyles} from '@triko-app/hooks';
import Button from 'components/base/buttons/button';
import useTranslation from 'shared/hooks/use-translate';
import ListLoader from 'shared/components/loaders/list-loader';
import ProductItem from './ProductItem';
import Text from 'components/base/text';
import {useProductsList} from 'shared/components/product-picker/hooks';
import AddProduct from './add-product';

const ProductsDialog = ({
  addLabel,
  label,
  placeholder,
  onClose,
  onSelect,
  selected = {},
  categories = [],
  market = {},
  disabledProducts = [],
}) => {
  const [classes] = useStyles(styles);
  const [openAdd, setOpenAdd] = useState(false);
  const [query, setQuery] = useState('');
  const {_t} = useTranslation();
  const {
    loading,
    products = [],
    refresh,
  } = useProductsList({
    query,
    categories,
  });
  const toggleAddProduct = () => setOpenAdd(!openAdd);
  const handleOnSaved = async () => {
    toggleAddProduct();
    await refresh();
  };
  const onChangeQuery = ({target: {value}}) => setQuery(value);
  return (
    <Dialog
      disableScroll
      onClose={onClose}
      contentStyles={classes.root}
      title={openAdd ? 'add_new_product' : label}>
      <View style={classes.wrapper}>
        {!openAdd && (
          <>
            <TextField
              primary
              placeholder={placeholder}
              onChange={onChangeQuery}
              value={query}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={classes.itemsWrapper}>
                {loading && <ListLoader size="md" />}
                {!loading && products.length === 0 && (
                  <View style={classes.emptyTextWrapper}>
                    <Text style={classes.emptyText}>
                      {_t('no_product_results')}
                    </Text>
                  </View>
                )}
                {!loading &&
                  products.map((item, key) => (
                    <ProductItem
                      key={`product-item-${key}`}
                      added={disabledProducts.includes(item.id)}
                      name={item.name}
                      category={item.category}
                      selected={selected && selected.id === item.id}
                      onPress={() => (onSelect ? onSelect(item) : null)}
                    />
                  ))}
              </View>
            </ScrollView>
          </>
        )}
        {openAdd && (
          <AddProduct
            defaultName={query}
            market={market}
            categories={categories}
            onSaved={handleOnSaved}
            onCancel={toggleAddProduct}
          />
        )}
        {/*{loading && <ListLoader size="md" />}*/}
        <View style={classes.action}>
          {!openAdd && (
            <Button secondary onPress={toggleAddProduct}>
              {_t(addLabel)}
            </Button>
          )}
        </View>
      </View>
    </Dialog>
  );
};

const styles = ({palette}) => ({
  action: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: palette.gray,
  },
  emptyTextWrapper: {
    marginVertical: 20,
  },
  itemsWrapper: {
    marginTop: 20,
  },
  root: {
    maxHeight: '85%',
    height: '85%',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ProductsDialog;
