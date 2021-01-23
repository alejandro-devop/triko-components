import useNavigate from 'shared/hooks/use-navigate';
import useTranslation from 'shared/hooks/use-translate';
import useStyles from 'shared/hooks/use-styles';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import Button from 'shared/components/base/buttons/button';
import React from 'react';
import styles from './styles';

const TypeNew = ({post = {}}) => {
  const {description, cta, ctaLabel = 'Call to cation'} = post;
  const {navigation} = useNavigate();
  const {_t} = useTranslation();
  const [classes] = useStyles(styles);
  const goTo = () => navigation.navigate(cta);
  return (
    <View style={classes.root}>
      <Text style={classes.text}>{description}</Text>
      {cta && (
        <View style={classes.actionsWrapper}>
          <Button primary size="xs" onPress={goTo}>
            {_t(ctaLabel)}
          </Button>
        </View>
      )}
    </View>
  );
};

export default TypeNew;
