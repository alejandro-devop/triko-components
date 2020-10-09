import React, {useState} from 'react';
import IconButton from 'components/base/buttons/icon-button';
import {useStyles} from 'hooks/index';
import styles from './styles';
import classNames from 'shared/utils/classnames';
import InputHelp from 'components/base/controls/input-help';

const HelpButton = ({content, secondary, title}) => {
  const [open, setOpen] = useState(false);
  const [classes] = useStyles(styles);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <IconButton
        onPress={toggleOpen}
        name="question-circle"
        iconStyles={classNames({icon: true, iconSecondary: secondary}, classes)}
      />
      {open && (
        <InputHelp
          open={open}
          onClose={toggleOpen}
          title={title}
          content={content}
        />
      )}
    </>
  );
};

export default HelpButton;
