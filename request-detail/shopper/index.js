import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'shared/components/commons';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import InfoRow from '../info-row';
import Icon from 'components/base/icon';
import ShoppingItem from './ShoppingItem'
import useTranslation from 'hooks/useTranslation';
import ActionButtons from '../action-buttons';
import {isEmpty} from 'shared/utils/functions';

const Shopper = ({onCancel, onBack, request = {}, title}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {attributes, details = []} = request;
  const requestAttrs = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const [serviceDetail = {}] = details;
  const {products = []} = serviceDetail;
  const {bagSize, market = {}} = requestAttrs;
  const address = {
    title: request.address,
  };

  return (
    <>
      <ScrollView
        style={classes.fullHeight}
        contentContainerStyle={classes.scroll}>
        <View style={classes.root}>
          {title && <Text style={classes.title}>{title}</Text>}
          <InfoRow
            label={_t('request_detail_deliver_address')}
            value={address.title}
            icon="map-marker"
          />
          <InfoRow
            label={_t('request_detail_market_address')}
            value={`${market.name} (${market.description})`}
            icon="map-marker"
          />
          <InfoRow
            label={_t('request_detail_bag_size')}
            value={`bag_size_${bagSize}`}
            icon="shopping-bag"
          />
          <View style={classes.cartTitle}>
            <Text style={classes.title}>{_t('request_details_cart')}</Text>
            <Icon name="shopping-cart" style={classes.icon} />
          </View>
          <View style={classes.cartWrapper}>
            {products.map((item, key) => (
              <ShoppingItem key={`shopping-item-${key}`} shoppingItem={item} />
            ))}
          </View>
        </View>
      </ScrollView>
      <ActionButtons onBack={onBack} onCancel={onCancel} />
    </>
  );
};

const styles = ({palette}) => ({
  contentWrapper: {
    flex: 1,
  },
  cartWrapper: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  cartTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  fullHeight: {
    flex: 1,
  },
  icon: {
    color: palette.blue,
    marginLeft: 5,
  },
  root: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  title: {
    color: palette.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Shopper;
