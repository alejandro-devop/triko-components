import React, {useState} from 'react';
import Control from './Control';
import MarketPlacesDialog from 'shared/components/base/controls/market-place-picker/MarketPlacesDialog';

const MarketPlacePicker = ({
  categories = [],
  label,
  onChangeCategories,
  placeholder,
  name,
  onChange,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const toggleDialog = () => setOpenDialog(!openDialog);
  const handleSelectMarket = market => {
    setSelectedMarket(market);
    setOpenDialog(false);
    if (onChange) {
      onChange({
        target: {
          name,
          value: market,
        },
      });
    }
  };

  return (
    <>
      <Control
        disabled={categories.length === 0}
        label={label}
        placeholder={placeholder}
        onPress={toggleDialog}
        value={selectedMarket}
      />
      {openDialog && (
        <MarketPlacesDialog
          categories={categories}
          onChangeCategories={onChangeCategories}
          onSelect={handleSelectMarket}
          open={openDialog}
          onClose={toggleDialog}
        />
      )}
    </>
  );
};

export default MarketPlacePicker;
