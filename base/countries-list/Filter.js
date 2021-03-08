import React from 'react';
import {View} from 'react-native';
import FilterBar from 'shared/components/base/filter-bar';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';

const Filter = ({onChange}) => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <FilterBar
        onChange={onChange}
        alwaysVisible
        placeholder={_t('general_search_country')}
        primary
      />
    </View>
  );
};

const styles = {
  root: {
    flexDirection: 'column',
  },
};

export default Filter;
