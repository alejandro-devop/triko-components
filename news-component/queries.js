import gql from 'graphql-tag';

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
