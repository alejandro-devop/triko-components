import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import useStyles from 'shared/hooks/use-styles';
import styles from './styles';
import {useFriendshipRequests} from 'shared/components/friendship-requests/hooks';
import FriendItem from './friend-item';
import ConfirmDialog from 'shared/components/dialogs/confirm-dialog';
import Text from 'shared/components/base/text';
import LinkButton from 'shared/components/base/buttons/link-button';
import TextField from 'shared/components/base/controls/text-field';
import useNavigate from 'shared/hooks/use-navigate';
import {useSendInvitation} from 'components/search-friends/hooks';
import {LoadingCurtain} from 'components/base/dialogs';

const MyFriendsList = () => {
  const [classes] = useStyles(styles);
  const [selectedToRemove, setSelectedToRemove] = useState(null);
  const {myFriends = [], refresh} = useFriendshipRequests();
  const [removeFriend, loading] = useSendInvitation();
  const {navigation} = useNavigate();

  const handleRemove = (item) => {
    setSelectedToRemove(item);
  };

  const handleCancel = () => setSelectedToRemove(null);

  const handleSearchFriends = () => {
    navigation.navigate('search-friends');
  };

  const handleFriendRemove = async () => {
    await removeFriend({friendIdOverride: selectedToRemove.id, remove: true});
    await refresh();
    handleCancel();
  };
  return (
    <>
      <ScrollView>
        <View style={classes.root}>
          {myFriends.length > 0 && (
            <>
              {myFriends.map((item, key) => (
                <FriendItem
                  delay={key * 100}
                  key={`my-friend-item-${key}`}
                  item={item}
                  onRemove={handleRemove}
                />
              ))}
            </>
          )}
          {myFriends.length === 0 && (
            <View style={classes.emptyWrapper}>
              <Text style={classes.emptyText}>no_friends_to_list</Text>
              <LinkButton onPress={handleSearchFriends} primary>
                search_friends
              </LinkButton>
            </View>
          )}
        </View>
        {loading && <LoadingCurtain disableModal />}
      </ScrollView>
      {Boolean(selectedToRemove) && (
        <ConfirmDialog
          onClose={handleCancel}
          onCancel={handleCancel}
          onAccept={handleFriendRemove}
          title="remove_friend"
          message="do_you_want_to_remove_your_friend"
        />
      )}
    </>
  );
};

export default MyFriendsList;
