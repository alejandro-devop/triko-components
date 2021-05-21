import React from 'react';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import classNames from 'utils/classnames';
import styles from './styles';

const SquareLoader = ({size = 180, style}) => {
  const [classes] = useStyles(styles);
  return (
    <View
      style={[
        classNames(
          {
            root: true,
          },
          [classes],
        ),
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
};

export default SquareLoader;
