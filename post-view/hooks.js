import useUserPosts from 'shared/components/news-component/hooks';

export const useGetPost = (postId) => {
  const {loading, posts = []} = useUserPosts({id: postId, noClient: true});
  console.log('postID ', postId);
  return {};
};
