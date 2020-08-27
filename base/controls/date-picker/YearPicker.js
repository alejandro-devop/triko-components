import React, {useRef} from 'react';
import _ from 'lodash';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import useStyles from 'shared/hooks/use-styles';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import classNames from 'shared/utils/classnames';
import useTranslation from 'hooks/useTranslation';

const YearPicker = ({open, onClose, onSelect, fromDate = 0, to = 0, year}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  const scrollRef = useRef(null);
  const years = to - fromDate;
  if (!years) {
    return null;
  }
  return (
    <Dialog
      disableScroll
      open={open}
      onClose={onClose}
      contentStyles={classes.root}>
      <Label>{_t('date_picker_select_year')}</Label>
      <ScrollView ref={scrollRef}>
        {_.times(years, yearKey => {
          const yearToDisplay = to - yearKey;
          const selected = yearToDisplay === parseInt(year, 10);
          return (
            <TouchableOpacity
              key={`year-key-${yearToDisplay}-`}
              style={classNames(
                {
                  item: true,
                  selected,
                },
                classes,
              )}
              onPress={() => onSelect(yearToDisplay)}>
              <Text style={classNames({selectedText: selected}, classes)}>
                {yearToDisplay}
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

export default YearPicker;
