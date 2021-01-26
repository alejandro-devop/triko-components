import {LIKE_POST} from './queries';
import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

export const useSendLike = (postId) => {
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/components/post-like-button/hooks.js',
  });
  const {
    stack: {client = {}, locale},
  } = useSession();
  const [callMutation] = useMutation(LIKE_POST);
  const sendLike = async (remove) => {
    try {
      setLoading(true);
      await callMutation({
        variables: {
          client: client.id,
          id: postId,
          remove: remove === true ? true : null,
          locale,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e, {message: 'Error while saving like', code: 'TK-000011'});
      setLoading(false);
    }
  };
  return [sendLike, loading];
};
