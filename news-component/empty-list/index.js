import React from 'react';
import {View} from 'react-native';
import PreImage from 'shared/components/base/pre-image';
import Text from 'shared/components/base/text';
import noNewsIcon from 'shared/assets/icons/news-icon.png';
import useStyles from 'shared/hooks/use-styles';
import useTranslation from 'shared/hooks/use-translate';
import styles from './styles';

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

export default EmptyList;
