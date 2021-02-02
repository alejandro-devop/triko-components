import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query getPosts(
    $id: Int
    $client: Int
    $onlyOwned: Boolean
    $onlyPublic: Boolean
    $triko: Int
    $locale: String = "en"
  ) {
    response: post(
      id: $id
      client_id: $client
      triko_id: $triko
      locale: $locale
      onlyOwned: $onlyOwned
      onlyPublic: $onlyPublic
    ) {
      id
      published: created_at
      author {
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
      postType {
        id
        name
      }
      content
      comments {
        id
        text
        created_at
        created_at
        author: client {
          id
          user {
            photo: photo_url
          }
          pi: personalinformation {
            id
            firstName: first_name
            lastName: last_name
          }
        }
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
      clientsLikes {
        id
        user {
          id
          photo: photo_url
        }
        pi: personalinformation {
          id
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
