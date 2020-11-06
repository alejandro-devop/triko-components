import gql from 'graphql-tag';

export const UPDATE_PROFILE_PHOTO = gql`
  mutation updateAvatar($id: Int, $photo: String) {
    response: avatar(user_id: $id, avatar: $photo) {
      id
      photo_url
    }
  }
`;
