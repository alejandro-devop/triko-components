import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import Button from 'components/base/buttons/button';
import useTranslation from 'hooks/useTranslation';
import useNavigate from 'shared/hooks/use-navigate';

const NewType = ({post = {}}) => {
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

const styles = () => ({
  actionsWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  root: {},
  text: {fontSize: 14},
});

export default NewType;
