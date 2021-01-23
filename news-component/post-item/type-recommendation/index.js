import useStyles from 'shared/hooks/use-styles';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import React from 'react';
import styles from './styles';

const RecommendationType = ({post = {}}) => {
  const [classes] = useStyles(styles);
  const {description, title} = post;
  return (
    <View style={classes.root}>
      {title && (
        <Text style={classNames({text: true, title: true}, classes)}>
          {title}
        </Text>
      )}
      {description && (
        <Text style={classNames({text: true, description}, classes)}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default RecommendationType;
