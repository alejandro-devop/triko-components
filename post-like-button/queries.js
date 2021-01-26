import gql from 'graphql-tag';

export const LIKE_POST = gql`
  mutation sendLike(
    $id: Int
    $triko: Int
    $client: Int
    $remove: Boolean
    $locale: String = "en"
  ) {
    response: likepost(
      post_id: $id
      triko_like_id: $triko
      client_like_id: $client
      remove: $remove
      locale: $locale
    ) {
      id
      postType {
        id
        name
      }
      content
      comments {
        text
        created_at
        created_at
      }
      title
      likes
      clientsLikes {
        id
        user {
          id
          photo: photo_url
        }
        pi: personalinformation {
          firstName: first_name
          lastName: last_name
        }
      }
      is_public
      images {
        url: url_download_file
      }
    }
  }
`;
