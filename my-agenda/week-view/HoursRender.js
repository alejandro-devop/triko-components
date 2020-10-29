import React from 'react';
import {View} from 'react-native';
import Text from 'components/base/text';
import useStyles from 'shared/hooks/use-styles';
import classNames from 'shared/utils/classnames';

const HoursRender = ({blockHeight = 10, dateBlocks = []}) => {
  const [classes] = useStyles(styles);
  return (
    <View style={[classes.root, {paddingTop: blockHeight}]}>
      {dateBlocks.map((hourObj, key) => (
        <View
          key={`hour-block-${key}`}
          style={[
            classNames({dateItem: true}, classes),
            {height: blockHeight},
          ]}>
          <Text style={classes.dateItemText}>{hourObj.hour}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = () => ({
  dateItem: {
    alignItems: 'flex-end',
    paddingRight: 2,
  },
  dateItemText: {
    fontSize: 10,
  },
  root: {},
});

export default HoursRender;
