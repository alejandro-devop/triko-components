import React from 'react';
import {View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import Text from 'components/base/text';
import classNames from 'shared/utils/classnames';

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

const styles = () => ({
  root: {},
  text: {
    color: '#FFF',
    fontSize: 14,
  },
  title: {
    marginBottom: 10,
  },
});

export default RecommendationType;
