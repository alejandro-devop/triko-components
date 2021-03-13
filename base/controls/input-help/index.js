import React from 'react';
import {View} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import useTranslation from 'shared/hooks/use-translate';
import Button from 'shared/components/base/buttons/button';

const InputHelp = ({open, onClose, title, content}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <Dialog
      title={_t(title)}
      contentStyles={classes.dialog}
      open={open}
      onClose={onClose}>
      <View style={classes.contentWrapper}>
        <Text style={classes.text}>{_t(content)}</Text>
      </View>
      <View style={classes.actions}>
        <Button primary onPress={onClose}>
          {_t('accept_text')}
        </Button>
      </View>
    </Dialog>
  );
};

export default InputHelp;
