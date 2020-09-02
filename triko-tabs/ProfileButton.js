import React from 'react';
import userPhoto from 'assets/avatars/profile-photo.jpg';
import PreImage from 'components/pre-image';
import useStyles from 'hooks/useStyles';
import useSession from 'hooks/useSession';

const ProfileButton = () => {
  const [classes] = useStyles(styles);
  const {
    stack: {user = {}},
  } = useSession();
  return (
    <PreImage
      source={user.photo_url ? {uri: user.photo_url} : userPhoto}
      style={classes.root}
    />
  );
};

const styles = () => ({
  root: {
    width: 35,
    height: 35,
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default ProfileButton;
