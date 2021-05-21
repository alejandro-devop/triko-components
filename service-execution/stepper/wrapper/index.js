import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import {useStyles} from '@triko-app/hooks';
import classNames from 'shared/utils/classnames';
import Slide from 'shared/components/anims/Slide';

const Wrapper = ({children, collapsed}) => {
  const [classes] = useStyles(styles);
  const ComponentWrapper = collapsed ? View : Slide;
  return (
    <ComponentWrapper
      direction={!collapsed ? 'top' : null}
      delay={300}
      style={classNames({root: true, rootCollapsed: collapsed}, classes)}>
      {children}
    </ComponentWrapper>
  );
};

export default Wrapper;
