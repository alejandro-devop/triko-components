import React from 'react';
import {ScrollView} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import useStyles from 'shared/hooks/use-styles';
import InputSuggestions from './InputSuggestions';
import useTranslation from 'hooks/useTranslation';

const AddressSuggestions = ({open, onClose, onSelectAddress}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Dialog
      contentStyles={classes.dialog}
      disableScroll
      open={open}
      onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputSuggestions
          label={_t('address_suggester_label_1')}
          placeholder={_t('address_suggester_ph_1')}
          primary
          autoFocus
          onSelectAddress={onSelectAddress}
        />
      </ScrollView>
    </Dialog>
  );
};

const styles = () => ({
  root: {
    backgroundColor: 'red',
    flex: 1,
  },
  dialog: {
    maxHeight: '90%',
    height: '90%',
  },
});

export default AddressSuggestions;
