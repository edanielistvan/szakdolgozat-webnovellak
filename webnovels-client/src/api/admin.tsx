import { graphql } from "@/graphql";
import { graphQLClient } from "./graphql";
import { QueryUsersOrderByColumn, SortOrder } from "@/graphql/graphql";

const allUsersGraphQL = graphql(`
query Users($search: String, $orderBy: QueryUsersOrderByColumn!, $orderDir: SortOrder!) {
    users(search: $search, orderBy: [{column: $orderBy, order: $orderDir}]) {
        id 
        name 
        email 
        role 
        banned
        password_reset
        created_at
        writer_request
    }
}
`)

export const allUsersQuery = {
    queryKey: (search: string, sort: string, dir: string) => ["users", search, sort, dir],
    queryFn: async ({ queryKey }: { queryKey: string[] }) => {
        const [,search, sort, dir] = queryKey;

        const toSort = (sort == 'name' ? QueryUsersOrderByColumn.Name : (sort == 'email' ? QueryUsersOrderByColumn.Email : (sort == "role" ? QueryUsersOrderByColumn.Role : QueryUsersOrderByColumn.WriterRequest)));
        const toOrder = (dir == 'desc' ? SortOrder.Desc : SortOrder.Asc);

        return graphQLClient.request(allUsersGraphQL, { search: '%' + search + '%', orderBy: toSort, orderDir: toOrder });
    }
}

const allReportsGraphQL = graphql(`
query Reports {
  reports {
    id
    comment {
      id
      text
    }
    reporter {
      id
      name
    }
    commenter {
      id
      name
    }
    created_at
  }
}
`)

export const allReportsQuery = {
  queryKey: ["reports"],
  queryFn: async () => {
    return graphQLClient.request(allReportsGraphQL);
  }
}

const reportCommentGraphQL = graphql(`
mutation ReportComment($commentId: ID!) {
  reportComment(commentId: $commentId)
}
`)

export const reportCommentMutation = {
  mutationKey: (commentId: string) => ["reportComment", commentId],
  mutationFn: async (commentId: string) => {
    return graphQLClient.request(reportCommentGraphQL, { commentId });
  }
}

export const swapUserRoleGraphQL = graphql(`
mutation SwapUserRole($userId: ID!) {
    swapUserRole(userId: $userId)
}
`)

export const swapUserRoleMutation = {
    mutationKey: (userId: string) => ["swapUserRole", userId],
    mutationFn: async (userId: string) => {
        return graphQLClient.request(swapUserRoleGraphQL, { userId: userId });
    }
}

export const toggleBanUserGraphQL = graphql(`
mutation ToggleBanUser($userId: ID!) {
    toggleBanUser(userId: $userId)
}
`)

export const toggleBanUserMutation = {
    mutationKey: (userId: string) => ["toggleBanUser", userId],
    mutationFn: async (userId: string) => {
        return graphQLClient.request(toggleBanUserGraphQL, { userId });
    }
}

const deleteUserGraphQL = graphql(`
mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
}
`)

export const deleteUserMutation = {
    mutationKey: (userId: string) => ["deleteUser", userId],
    mutationFn: async (userId: string) => {
        return graphQLClient.request(deleteUserGraphQL, { userId: userId });
    }
}

const dismissReportGraphQL = graphql(`
mutation DismissReport($commentId: ID!) {
    dismissReport(commentId: $commentId)
}
`);

export const dismissReportMutation = {
    mutationKey: ["dismissReport"],
    mutationFn: async (commentId: string) => {
        return graphQLClient.request(dismissReportGraphQL, { commentId });
    }
};

const removeCommentGraphQL = graphql(`
mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId)
}
`)

export const removeCommentMutation = {
    mutationKey: ["removeComment"],
    mutationFn: async (commentId: string) => {
        return graphQLClient.request(removeCommentGraphQL, { commentId });
    },
}