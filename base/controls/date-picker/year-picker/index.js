import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native';
import Dialog from 'shared/components/dialogs/dialog';
import {ScrollView} from 'shared/components/commons';
import {useStyles} from '@triko-app/hooks';
import Text from 'shared/components/base/text';
import Label from 'shared/components/base/label';
import classNames from 'shared/utils/classnames';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

/**
 * This component is used to display a dialog to list the year
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param open
 * @param onClose
 * @param onSelect
 * @param fromDate
 * @param to
 * @param year
 * @param ref
 * @returns {null|*}
 * @constructor
 */
const YearPicker = (
  {open, onClose, onSelect, fromDate = 0, to = 0, year},
  ref,
) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
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
      <ScrollView>
        {_.times(years, (yearKey) => {
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

YearPicker.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  fromDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default YearPicker;
