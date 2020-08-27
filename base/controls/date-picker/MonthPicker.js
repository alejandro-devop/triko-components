import React from 'react';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import useStyles from 'shared/hooks/use-styles';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import classNames from 'shared/utils/classnames';
import useLocales from 'hooks/useLocales';
import useTranslation from 'hooks/useTranslation';

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

const styles = ({palette}) => ({
  item: {
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomColor: palette.grayLighter,
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 20,
      },
      android: {
        borderBottomWidth: 1,
      },
    }),
  },
  root: {
    height: '60%',
    width: Platform.select({ios: 200, android: 200}),
  },
  selected: {
    backgroundColor: palette.blue,
  },
  selectedText: {
    color: '#FFF',
  },
});

export default MonthPicker;
