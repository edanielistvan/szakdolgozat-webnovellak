import { graphql } from '../graphql'
import { graphQLClient } from './graphql'

const userProfileGraphQL = graphql(`
query UserProfile($id: ID!) {
    userProfile(id:$id) {
        user {
            id
            name
            email
            role
            created_at
            writer_request
        }
        is_writer
        favourites {
            id
            title
            description
            image
            rating
            reads
            user {
                id
                name
            }
        }
        novels {
            id
            title
            description
            image
            rating
            reads
            user {
                id
                name
            }
        }
    }
}
`)

export const userProfileQuery = {
  queryKey: (id: string) => ['userProfile', id],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return graphQLClient.request(userProfileGraphQL, { id });
  }
}

const userReadingListGraphQL = graphql(`
query UserReadingList($id: ID!) {
    userReadingList(id: $id) {
        id
        novel_id,
        novel_title,
        chapter_id,
        chapter_title
        chapter_number,
        chapters_max
    }
}`)

export const userReadingListQuery = {
  queryKey: (id: string) => ['userReadingList', id],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return graphQLClient.request(userReadingListGraphQL, { id });
  }
}

const userQuotesGraphQL = graphql(`
query UserQuotes($id: ID!) {
    userQuotes(user_id:$id) {
        quote
        novel {
            title
        }
        chapter {
            title
            number
        }
    }
}`)

export const userQuotesQuery = {
  queryKey: (id: string) => ['userQuotes', id],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return graphQLClient.request(userQuotesGraphQL, { id });
  }
}

const requestWriterRoleGraphQL = graphql(`
mutation RequestWriterRole {
  requestWriterRole
}
`);

export const requestWriterRoleMutation = {
  mutationKey: ["requestWriterRole"],
  mutationFn: async () => {
    return graphQLClient.request(requestWriterRoleGraphQL);
  }
};