import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import InfoRow from '../info-row';
import Icon from 'components/base/icon';
import ShoppingItem from './ShoppingItem';
import {mockedCart, mockedForm} from './mocks';
import useTranslation from 'hooks/useTranslation';
import ActionButtons from '../action-buttons';

const Shopper = ({request = {}, title}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const {address = {}, market = {}, bagSize} = mockedForm;
  return (
    <>
      <ScrollView
        style={classes.fullHeight}
        contentContainerStyle={classes.scroll}>
        <View style={classes.root}>
          {title && <Text style={classes.title}>{title}</Text>}
          <InfoRow
            label={_t('request_detail_market_address')}
            value={address.title}
            icon="map-marker"
          />
          <InfoRow
            label={_t('request_detail_deliver_address')}
            value={`${market.primary} (${market.secondary})`}
            icon="map-marker"
          />
          <InfoRow
            label={_t('request_detail_bag_size')}
            value={bagSize}
            icon="shopping-bag"
          />
          <View style={classes.cartTitle}>
            <Text style={classes.title}>{_t('request_details_cart')}</Text>
            <Icon name="shopping-cart" style={classes.icon} />
          </View>
          <View style={classes.cartWrapper}>
            {mockedCart.map((item, key) => (
              <ShoppingItem key={`shopping-item-${key}`} shoppingItem={item} />
            ))}
          </View>
        </View>
      </ScrollView>
      <ActionButtons />
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
