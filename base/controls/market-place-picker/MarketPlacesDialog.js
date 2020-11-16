import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import TextField from 'components/base/controls/text-field';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';
import ShopperNeedsHorizontal from 'shared/components/base/controls/shopper-needs-horizontal';
import SuggestionsList from './SuggestionsList';
import {useMarketsList} from './hooks';
import MarketPreview from 'shared/components/base/controls/market-place-picker/MarketPreview';
import {CircularLoader} from 'components/base/loaders';

const MarketPlacesDialog = ({
  open,
  onClose,
  categories = [],
  onChangeCategories,
  onSelect,
}) => {
  const [classes] = useStyles(styles);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const {_t} = useTranslation();
  const handleChange = ({target: {value}}) => setQuery(value);
  const {places, loading} = useMarketsList({categories, query});
  const handleCategoriesChange = ({target: {value}}) => {
    if (value.length >= 1) {
      onChangeCategories(value);
    }
  };
  const onSelectMarket = (market) => {
    setSelected(market);
  };
  const handleSelectMarket = () => {
    if (onSelect) {
      onSelect(selected);
    }
  };
  const onSelectOther = () => {
    setSelected(null);
  };
  console.log('Places: ', places);
  return (
    <Dialog
      contentStyles={classes.root}
      disableScroll
      open={open}
      onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <CircularLoader />}
        {!selected && (
          <>
            <View style={classes.content}>
              <TextField
                primary
                label={_t('filter_market_places')}
                placeholder={_t('filter_market_places_ph')}
                onChange={handleChange}
                value={query}
              />
              <ShopperNeedsHorizontal
                onChange={handleCategoriesChange}
                value={categories}
              />
            </View>
            {!loading && (
              <SuggestionsList items={places} onSelect={onSelectMarket} />
            )}
          </>
        )}
        {selected && (
          <MarketPreview
            onSelectMarket={handleSelectMarket}
            onClearSelection={onSelectOther}
            market={selected}
          />
        )}
      </ScrollView>
    </Dialog>
  );
};

const styles = () => ({
  content: {
    paddingHorizontal: 20,
  },
  root: {
    height: '80%',
  },
});

export default MarketPlacesDialog;
