import React from 'react';
import styles from './styles';
import {useStyles} from 'hooks/index';
import classNames from 'shared/utils/classnames';
import Slide from 'shared/components/anims/Slide';

const Wrapper = ({children, collapsed}) => {
  const [classes] = useStyles(styles);
  return (
    <Slide
      direction="top"
      delay={800}
      style={classNames({root: true, rootCollapsed: collapsed}, classes)}>
      {children}
    </Slide>
  );
};

export default Wrapper;
