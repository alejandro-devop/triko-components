import React from 'react';
import {View} from 'react-native';
import IconButton from 'shared/components/base/buttons/icon-button';
import {useStyles} from '@triko-app/hooks';
import Icon from 'shared/components/base/icon';
import Text from 'shared/components/base/text';
import styles from './styles';

const RecommendationsButton = ({readOnly, count}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {readOnly ? (
        <Icon name="thumbs-up" style={classes.icon} />
      ) : (
        <IconButton name="thumbs-up" iconStyles={classes.icon} />
      )}
      {count > 0 && (
        <View style={classes.countWrapper}>
          <Text style={classes.countText} variant="caption">
            {count}
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecommendationsButton;
