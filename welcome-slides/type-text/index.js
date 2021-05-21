import React from 'react';
import {View} from 'react-native';
import Text from 'shared/components/base/text';
import classNames from 'shared/utils/classnames';
import {useStyles} from '@triko-app/hooks';
import styles from './styles';

const TypeText = ({text, type}) => {
  const title = type === 'title';
  const primary = type === 'primary' && !title;
  const secondary = type === 'secondary' && !title;
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      <Text
        style={classNames({primary, secondary, text: true, title}, classes)}>
        {text}
      </Text>
    </View>
  );
};

export default TypeText;
