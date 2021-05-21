import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSession} from 'hooks/index';
import {useStyles} from '@triko-app/hooks';
import PreImage from 'shared/components/base/pre-image';
import defaultImage from 'assets/avatars/profile-photo.jpg';
import Text from 'shared/components/base/text';
import Slide from 'shared/components/anims/Slide';
import Button from 'shared/components/base/buttons/button';
import {isEmpty} from 'shared/utils/functions';
import {useSendInvitation} from 'components/search-friends/hooks';
import {CircularLoader} from 'components/base/loaders';
import classNames from 'shared/utils/classnames';

/**
 * Renders a single client result item.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param delay
 * @param item
 * @param onRequestSend
 * @param onViewProfile
 * @returns {*}
 * @constructor
 */
const RequestItem = ({delay, item, onViewProfile, onRequestSend}) => {
  const [classes] = useStyles(styles);
  const {pi = {}, user = {}, id} = item;
  const {
    stack: {sendFriendshipRequestsIds = [], friendShipRequestsIds = []},
  } = useSession();
  const {photo} = user;
  const {firstName, lastName} = pi;
  const [sendInvitation, loading] = useSendInvitation(id);
  const handleSendInvitation = async (options = {}) => {
    const {remove, accept, reject} = options;
    await sendInvitation({remove, accept, reject});
    if (onRequestSend) {
      onRequestSend();
    }
  };
  const sendByMe = sendFriendshipRequestsIds.includes(id);
  const received = friendShipRequestsIds.includes(id);
  return (
    <Slide
      delay={delay}
      style={classNames({root: true, rootSelected: sendByMe}, classes)}>
      <TouchableOpacity onPress={onViewProfile} style={classes.avatarWrapper}>
        <PreImage
          source={!isEmpty(photo) ? {uri: photo} : defaultImage}
          style={classes.avatar}
        />
      </TouchableOpacity>
      <View style={classes.textWrapper}>
        <TouchableOpacity onPress={onViewProfile}>
          <Text style={classes.textName}>{`${firstName} ${lastName}`}</Text>
          {sendByMe && <Text style={classes.textInvited}>invitation_send</Text>}
          {received && (
            <Text style={classes.textInvited}>
              you_received_this_invitation
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          {!sendByMe && !received && (
            <Button secondary size="xxs" onPress={handleSendInvitation}>
              send_invitation
            </Button>
          )}
          {sendByMe && (
            <Button
              primary
              size="xxs"
              onPress={() => handleSendInvitation({remove: true})}>
              cancel_invitation
            </Button>
          )}
          {received && (
            <View style={classes.actions}>
              <Button
                secondary
                size="xxs"
                onPress={() => handleSendInvitation({accept: true})}>
                accept_invitation
              </Button>
              <Button
                primary
                size="xxs"
                onPress={() => handleSendInvitation({reject: true})}>
                reject_text
              </Button>
            </View>
          )}
        </>
      )}
    </Slide>
  );
};

RequestItem.propTypes = {
  delay: PropTypes.number,
  item: PropTypes.shape({
    client: PropTypes.shape({
      pi: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }),
    }),
    user: PropTypes.shape({
      photo_url: PropTypes.string,
    }),
  }),
  onViewProfile: PropTypes.func,
};

RequestItem.defaultProps = {
  delay: 0,
  item: {},
};

export default RequestItem;
