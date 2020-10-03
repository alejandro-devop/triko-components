import React from 'react';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import noNewsIcon from 'assets/icons/news-icon.png';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'hooks/useTranslation';

const EmptyList = () => {
  const [classes] = useStyles(styles);
  const {_t} = useTranslation();
  return (
    <View style={classes.root}>
      <View style={classes.imageWrapper}>
        <PreImage style={classes.image} source={noNewsIcon} />
      </View>
      <Text style={classes.caption}>{_t('no_news_to_be_displayed')}</Text>
    </View>
  );
};

const styles = ({palette}) => ({
  caption: {
    color: palette.orange,
    fontWeight: '400',
    marginTop: 20,
    width: 200,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: 140,
    height: 140,
  },
  root: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default EmptyList;
