import gql from 'graphql-tag';

export const SAVE_COMMENT = gql`
  mutation commentPost(
    $id: Int
    $client: Int
    $post: Int
    $comment: String
    $locale: String = "en"
    $remove: Boolean
  ) {
    response: commentpost(
      comment_id: $id
      post_id: $post
      comment: $comment
      locale: $locale
      client_id: $client
      remove: $remove
    ) {
      id
      text
      created_at
      updated_at
    }
  }
`;
