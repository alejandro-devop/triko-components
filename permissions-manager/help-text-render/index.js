import React from 'react';
import {View} from 'react-native';
import {useStyles} from 'hooks/index';
import Text from 'shared/components/base/text';
import styles from './styles';

const HelpTextRender = ({helpText = []}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={classes.root}>
      {helpText.map((text, key) => (
        <View key={`help-text-${key}`} style={classes.textWrapper}>
          <View style={classes.caret} />
          <Text style={classes.text}>{text}</Text>
        </View>
      ))}
    </View>
  );
};

export default HelpTextRender;
