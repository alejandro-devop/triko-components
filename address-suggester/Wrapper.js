import React from 'react';
import {View} from 'react-native';
import Label from 'shared/components/base/label';
import useStyles from 'shared/hooks/use-styles';
import LinkButton from 'shared/components/base/buttons/link-button';
import Button from 'shared/components/base/buttons/button';
import useTranslation from 'hooks/useTranslation';

/**
 * This component only renders a wrapper container for the suggester.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param children
 * @param searched
 * @param toggleAdvanceOptions
 * @param toggleCurrentLocation
 * @param useMyLocation
 * @param visibleCurrentLocation
 * @param selected
 * @param visibleAdvanced
 * @returns {*}
 * @constructor
 */
const Wrapper = ({
  children,
  selected,
  searched = true,
  toggleAdvanceOptions,
  toggleCurrentLocation,
  visibleAdvanced,
  visibleCurrentLocation,
}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      {children}
      {searched && !visibleCurrentLocation && !selected && (
        <View style={classes.options}>
          <Label>{_t('address_suggester_not_found')}</Label>
          {!visibleAdvanced && (
            <LinkButton onPress={toggleAdvanceOptions} primary>
              {_t('address_suggester_change_department_and_city')}
            </LinkButton>
          )}
          <LinkButton onPress={toggleCurrentLocation} primary>
            {_t('address_suggester_use_current_location')}
          </LinkButton>
        </View>
      )}
      {!selected && (
        <View style={classes.actions}>
          <Button disabled={!selected} primary>
            {_t('continue_text')}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = () => ({
  actions: {
    marginTop: 20,
  },
  options: {
    alignItems: 'center',
  },
  root: {
    backgroundColor: '#FFF',
    paddingBottom: 15,
    paddingHorizontal: 20,
    marginBottom: 200,
  },
});

export default Wrapper;
