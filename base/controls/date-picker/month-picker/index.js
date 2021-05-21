import React from 'react';
import {TouchableOpacity} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import {ScrollView} from 'shared/components/commons';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import classNames from 'shared/utils/classnames';
import useLocales from 'shared/hooks/use-locales';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

const MonthPicker = ({open, onClose, onSelect, month}) => {
  const {months} = useLocales();
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  return (
    <Dialog
      disableScroll
      open={open}
      onClose={onClose}
      contentStyles={classes.root}>
      <Label>{_t('date_picker_edit_month')}</Label>
      <ScrollView>
        {months.map((monthToDisplay, key) => {
          const selected = month === key + 1;
          return (
            <TouchableOpacity
              key={`month-key-${key}`}
              style={classNames(
                {
                  item: true,
                  selected,
                },
                classes,
              )}
              onPress={() => onSelect(key + 1)}>
              <Text style={classNames({selectedText: selected}, classes)}>
                {monthToDisplay}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Dialog>
  );
};

export default MonthPicker;
