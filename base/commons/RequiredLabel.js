import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';

const RequiredLabel = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <Text style={classes.text}>{_t('form_required_fields')}</Text>
    </View>
  );
};

const styles = ({palette}) => ({
  root: {
    marginBottom: 10,
  },
  text: {
    color: palette.red,
    textAlign: 'center',
  },
});

export default RequiredLabel;
