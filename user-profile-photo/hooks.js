import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_PROFILE_PHOTO} from 'config/queries/user-queries';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';
import {useSession} from 'hooks/index';

/**
 * This hook controls the user profile photo update.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{updatePhoto: Promise, loading: boolean}}
 */
export const useAvatarUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [updateAvatar] = useMutation(UPDATE_PROFILE_PHOTO);
  const {
    stack: {user = {}},
    setKey,
  } = useSession();
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/components/user-profile-photo/hooks.js',
  });
  /**
   * This function saves the user profile photo, and updates
   * the session stored url
   * @param fileData
   * @returns {Promise<void>}
   */
  const updatePhoto = async ({fileData}) => {
    setLoading(true);
    try {
      const imageData = `data:image/png;base64,${fileData}`;
      const {data = {}} = await updateAvatar({
        variables: {
          id: user.id,
          photo: imageData,
        },
      });
      await setKey('user', {
        ...user,
        photo_url: data.response.photo_url,
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      error('Error while updating the avatar');
      setLoading(false);
    }
  };

  return {
    loading,
    updatePhoto,
  };
};
