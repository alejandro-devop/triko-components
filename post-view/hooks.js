import {useState} from 'react';
import {SAVE_COMMENT} from './queries';
import useUserPosts from 'shared/components/news-component/hooks';
import {useMutation} from '@apollo/react-hooks';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useSession} from 'hooks/index';

export const useGetPost = (postId, clientId, trikoId, isTriko) => {
  const {loading, loaded, posts = [], refresh} = useUserPosts({
    id: postId,
    clientId,
    trikoId,
    isTriko,
  });
  const [post] = posts;
  return {
    loading,
    loaded,
    post,
    refresh,
  };
};

export const useSaveComment = (postId, isTriko) => {
  const [loading, setLoading] = useState(false);
  const [callMutation] = useMutation(SAVE_COMMENT);
  const {
    stack: {client = {}, triko = {}},
  } = useSession();
  const reportError = useErrorReporter({
    path: 'src/shared/components/post-view/hooks.js',
  });
  const sendRequest = async (payload = {}) => {
    const {comment} = payload;
    setLoading(true);
    try {
      await callMutation({
        variables: {
          post: postId,
          comment,
          ...(isTriko ? {triko: triko.id} : {client: client.id}),
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e, {
        message: 'Error while commenting the post',
        code: 'TK-000009',
      });
      setLoading(false);
    }
  };

  return [sendRequest, loading];
};

export const useCommentRemove = (commentId, postId) => {
  const [loading, setLoading] = useState();
  const [callMutation] = useMutation(SAVE_COMMENT);
  const reportError = useErrorReporter({
    path: 'src/shared/components/post-view/hooks.js',
  });
  const remove = async () => {
    setLoading(true);
    try {
      await callMutation({
        variables: {
          id: commentId,
          post: postId,
          remove: true,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e, {
        message: 'Error while removing the comment',
        code: 'TK-000010',
      });
      setLoading(false);
    }
  };
  return [remove, loading];
};
