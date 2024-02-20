import gql from "graphql-tag";

export default gql`
  mutation inviteShopMember($input: InviteUsersInput!) {
    inviteShopMember(input: $input)
  }
`;