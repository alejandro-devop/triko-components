import React from 'react';
import {Modal, SafeAreaView} from 'react-native';
import Chat from 'components/chat';
import useStyles from 'hooks/useStyles';

const ChatDialog = ({open, onClose, request}) => {
  const [classes] = useStyles(styles);
  return (
    <Modal visible={open} animationType="slide">
      <SafeAreaView style={classes.root}>
        <Chat request={request} onClose={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = {
  root: {
    flex: 1,
  },
};

export default ChatDialog;
