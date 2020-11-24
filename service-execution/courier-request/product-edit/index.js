import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Dialog from 'shared/components/dialogs/dialog';
import {isEmpty} from 'shared/utils/functions';
import {useStyles} from 'hooks/index';
import styles from './styles';
import useForm from 'hooks/useForm';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import RadioButton from 'shared/components/base/controls/radio-button';
import NumberPicker from 'shared/components/base/controls/number-picker';
import useTranslation from 'hooks/useTranslation';
import Icon from 'shared/components/base/icon';
import MoneyPicker from 'components/base/money-picker';
import useRegionConfig from 'shared/hooks/use-regional-config';
import Button from 'shared/components/base/buttons/button';
import LinkButton from 'shared/components/base/buttons/link-button';
import ProductPicker from 'shared/components/product-picker';
import {useUpdateProduct} from '../hooks';
import {LoadingCurtain} from 'components/base/dialogs';
import PreImage from 'shared/components/base/pre-image';

const ProductEdit = ({
  open,
  onClose,
  product: productItem = {},
  request = {},
  onSaved,
}) => {
  const [classes] = useStyles(styles);
  const {
    image,
    measure = {},
    price: defaultPrice,
    quantity = 0,
    attrs,
  } = productItem;
  const productAttrs = !isEmpty(attrs) ? JSON.parse(attrs) : {};
  const {found: defaultFound = true} = productAttrs;
  const {_t} = useTranslation();
  const [product, setProduct] = useState(productItem.product);
  const [enableSelectProduct, setEnableSelectProduct] = useState(false);
  const {minimumMoneyStep: minimumStep = 1} = useRegionConfig();
  const {updateProduct, loading} = useUpdateProduct(request, productItem);
  const {form = {}, onChange} = useForm({
    found: defaultFound,
    price: defaultPrice,
    units: quantity,
  });
  const requestAttributes = !isEmpty(request.attributes)
    ? JSON.parse(request.attributes)
    : {};
  const {market = {}} = requestAttributes;
  const categories = productItem.product.categories.map(
    (item) => item.category,
  );
  const {found, units, price} = form;
  let formValid = true;
  if (found && (units === 0 || price === 0)) {
    formValid = false;
  } else if (!found && enableSelectProduct && (units === 0 || price === 0)) {
    formValid = false;
  }

  const handleSaveForm = async () => {
    await updateProduct({
      product,
      units,
      price: !found && !enableSelectProduct ? 0 : price,
      found,
      oldProduct: productItem,
    });
    if (onSaved) {
      onSaved();
    }
  };
  return (
    <Dialog
      disableScroll
      open={open}
      onClose={onClose}
      contentStyles={classes.root}>
      <ScrollView useKeyboard>
        <View style={classes.content}>
          <View style={classes.avatarWrapper}>
            {isEmpty(image) ? (
              <Icon name="shopping-bag" style={classes.avatarIcon} />
            ) : (
              <PreImage
                source={{uri: image.url_download_file}}
                style={classes.avatar}
              />
            )}
          </View>
          {found && (
            <View style={[classes.productWrapper, classes.row]}>
              <Text style={classes.productText}>{product.name}</Text>
            </View>
          )}
          {/*{!found && !enableSelectProduct && (*/}
          {/*  <View style={classes.linkButton}>*/}
          {/*    <LinkButton primary onPress={() => setEnableSelectProduct(true)}>*/}
          {/*      take_another_product*/}
          {/*    </LinkButton>*/}
          {/*  </View>*/}
          {/*)}*/}
          {!enableSelectProduct && (
            <>
              <Label>do_you_find_the_product</Label>
              <View style={[classes.radioRow, classes.row]}>
                <RadioButton
                  label="yes_text"
                  horizontal
                  fromLeft
                  value={found}
                  onChange={() =>
                    onChange({target: {name: 'found', value: true}})
                  }
                />
                <RadioButton
                  label="no_text"
                  horizontal
                  fromLeft
                  value={!found}
                  onChange={() =>
                    onChange({target: {name: 'found', value: false}})
                  }
                />
              </View>
            </>
          )}
          {enableSelectProduct && (
            <View style={classes.row}>
              <ProductPicker
                primary
                market={market}
                categories={categories}
                placeholder={'select_another_product'}
                addLabel={'select_this_product'}
                selected={[product.id]}
              />
            </View>
          )}
          {(found || enableSelectProduct) && (
            <>
              <View style={classes.row}>
                <NumberPicker
                  primary
                  label={_t('how_many_units_found', {unit: measure.name})}
                  value={units}
                  name="units"
                  onChange={onChange}
                  min={1}
                  max={quantity}
                />
              </View>
              <View style={classes.row}>
                <MoneyPicker
                  name="price"
                  value={price}
                  onChange={onChange}
                  enableEdit
                  primary
                  step={minimumStep}
                />
              </View>
            </>
          )}
          <View style={classes.actions}>
            <Button primary onPress={handleSaveForm} disabled={!formValid}>
              save_text
            </Button>
            <Button secondary onPress={onClose}>
              cancel_text
            </Button>
          </View>
        </View>
      </ScrollView>
      {loading && <LoadingCurtain disableModal />}
    </Dialog>
  );
};

export default ProductEdit;
