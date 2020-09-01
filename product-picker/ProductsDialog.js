import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import TextField from 'components/base/controls/text-field';
import useStyles from 'shared/hooks/use-styles';
import Button from 'components/base/buttons/button';
import useTranslation from 'hooks/useTranslation';
import ListLoader from 'shared/components/loaders/list-loader';
import ProductItem from './ProductItem';
import Text from 'components/base/text';
import {useProductMock} from 'shared/components/product-picker/products.mock';

const ProductsDialog = ({
  label,
  placeholder,
  onClose,
  onSelect,
  selected = {},
}) => {
  const [classes] = useStyles(styles);
  const [query, setQuery] = useState('');
  const {_t} = useTranslation();
  const {loading, products = []} = useProductMock({query});
  const onChangeQuery = ({target: {value}}) => setQuery(value);
  return (
    <Dialog
      disableScroll
      onClose={onClose}
      contentStyles={classes.root}
      title={label}>
      <View style={classes.wrapper}>
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
                  name={item.name}
                  category={item.category}
                  selected={selected && selected.id === item.id}
                  onPress={() => (onSelect ? onSelect(item) : null)}
                />
              ))}
          </View>
        </ScrollView>
        {/*{loading && <ListLoader size="md" />}*/}
        <View style={classes.action}>
          <Button secondary>{_t('add_new_product_text')}</Button>
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
