import {useState} from 'react';
import {SAVE_POST} from './queries';
import {useMutation} from '@apollo/react-hooks';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useSession} from 'hooks/index';

export const useSavePost = () => {
  const [callMutation] = useMutation(SAVE_POST);
  const {
    stack: {client = {}, locale},
  } = useSession();
  const [loading, setLoading] = useState();
  const reportError = useErrorReporter({
    path: 'src/shared/components/post-add/hooks.js',
  });
  const sendRequest = async (payload = {}) => {
    const {isPublic, content, title, photo} = payload;
    try {
      setLoading(true);
      await callMutation({
        variables: {
          client: client.id,
          isPublic,
          content,
          title,
          locale,
          photo,
        },
      });
      setLoading(false);
      return true;
    } catch (e) {
      reportError(e, {
        message: 'Error while saving the post',
        code: 'TK-000008',
      });
      setLoading(false);
      return false;
    }
  };
  return [sendRequest, loading];
};
