import gql from 'graphql-tag';

export const SAVE_POST = gql`
  mutation addPost(
    $id: Int
    $triko: Int
    $client: Int
    $isPublic: Boolean
    $title: String
    $content: String
    $start: String
    $end: String
    $photo: String
    $attrs: String
    $remove: Boolean
    $locale: String = "en"
  ) {
    response: post(
      post_id: $id
      triko_id: $triko
      client_id: $client
      is_public: $isPublic
      content: $content
      title: $title
      start_at: $start
      end_at: $end
      photo: $photo
      attrs: $attrs
      remove: $remove
      locale: $locale
    ) {
      id
      post_type_id
      postType {
        id
        name
      }
      is_public
      content
      start_at
      end_at
      title
      likes
      comments {
        text
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts($id: Int, $client: Int, $triko: Int, $locale: String = "en") {
    response: post(
      id: $id
      client_id: $client
      triko_id: $triko
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
      trikosLikes {
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

export const SEND_LIKE = gql`
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
      trikosLikes {
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
