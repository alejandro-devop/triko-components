import React, {useState} from 'react';
import Control from './Control';
import MarketPlacesDialog from 'shared/components/base/controls/market-place-picker/MarketPlacesDialog';
import useToggle from 'shared/hooks/use-toggle';
import AddMarketPlace from './add-market-place';
const MarketPlacePicker = ({
  categories = [],
  label,
  onChangeCategories,
  placeholder,
  name,
  onChange,
  value,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAdd, toggleAdd] = useToggle(false);
  const [selectedMarket, setSelectedMarket] = useState(value);
  const toggleDialog = () => setOpenDialog(!openDialog);
  const handleOnSave = () => {
    toggleAdd();
  };
  const handleSelectMarket = (market) => {
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
      {openDialog && !openAdd && (
        <MarketPlacesDialog
          categories={categories}
          onChangeCategories={onChangeCategories}
          onSelect={handleSelectMarket}
          open={openDialog}
          onClose={toggleDialog}
          onAdd={toggleAdd}
        />
      )}
      {openAdd && (
        <AddMarketPlace
          onClose={() => toggleAdd()}
          onSaved={handleOnSave}
          open
        />
      )}
    </>
  );
};

export default MarketPlacePicker;
