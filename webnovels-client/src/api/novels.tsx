import type { QuerySearchNovelsOrderByOrderByClause, QuerySearchNovelsWhereWhereConditions, QuoteInput, ReadingList } from '@/graphql/graphql';
import { graphql } from '../graphql'
import { graphQLClient } from './graphql'

const getNovelGraphQL = graphql(`
query GetNovel($id: ID!) {
    getNovel(id:$id) {
        id
        user {
            id
            name
        }
        title
        description
        image
        rating
        reads
        chapters {
            id
            number
            title
        }
        tags {
            name
        }
    }
}
`)

export const getNovelQuery = {
  queryKey: (id: string) => ['getNovel', id],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return graphQLClient.request(getNovelGraphQL, { id });
  }
}

const getCommentsGraphQL = graphql(`
query GetComments($novelId: ID!) {
    getComments(novelId:$novelId) {
        id
        user {
            id
            name
        }
        text
        upvotes
        downvotes
        userVote
        replies {
            id
            user {
                id
                name
            }
            text
            upvotes
            downvotes
            userVote
        }
    }
}
`)

export const getCommentsQuery = {
  queryKey: (novelId: string) => ['getComments', novelId],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, novelId] = queryKey;
    return graphQLClient.request(getCommentsGraphQL, { novelId: novelId });
  }
}

const createCommentGraphQL = graphql(`
mutation CreateComment($novelId: ID!, $parentId: ID, $text: String!) {
    createComment(novelId: $novelId, parentId: $parentId, text: $text)
}  
`)

export const createCommentMutation = {
    mutationKey: (novelId: string, parentId: string | null, text: string) => ['createComment', novelId, parentId, text],
    mutationFn: async ({novelId, parentId, text}: {novelId: string, parentId: string | null, text: string}) => {
        return graphQLClient.request(createCommentGraphQL, { novelId: novelId, parentId: parentId, text: text });
    }
}

const doVoteGraphQL = graphql(`
mutation DoVote($commentId: ID!, $value: Int!) {
    doVote(commentId: $commentId, value: $value)
}  
`)

export const doVoteMutation = {
    mutationKey: (commentId: string, value: number) => ['doVote', commentId, value],
    mutationFn: async ({commentId, value}: {commentId: string, value: number}) => {
        return graphQLClient.request(doVoteGraphQL, { commentId: commentId, value: value });
    }
}

const removeVoteGraphQL = graphql(`
mutation RemoveVote($commentId: ID!) {
    removeVote(commentId: $commentId)
}  
`)

export const removeVoteMutation = {
    mutationKey: (commentId: string) => ['doVote', commentId],
    mutationFn: async (commentId: string) => {
        return graphQLClient.request(removeVoteGraphQL, { commentId: commentId });
    }
}

const getChapterGraphQL = graphql(`
query GetChapter($id: ID!) {
    getChapter(id:$id) {
        number
        title
        text
        
        novel {
            id
            rating
            title
            chapters {
                id
                number
                title
            }
            user {
                id
                name
            }
        }
    }
}
`)

export const getChapterQuery = {
  queryKey: (id: string) => ['getChapter', id],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, id] = queryKey;
    return graphQLClient.request(getChapterGraphQL, { id });
  }
}

const getBookmarkGraphQL = graphql(`
query GetBookmark($novelId: ID!) {
    getBookmark(novelId: $novelId) {
        chapter_id
    }
}  
`)

export const getBookmarkQuery = {
    queryKey: (novelId: string) => ['getBookmark', novelId],
    queryFn: async ({ queryKey }: { queryKey: string[] }) => {
        const [, novelId] = queryKey;
        return graphQLClient.request(getBookmarkGraphQL, { novelId: novelId });
    }
}

const createBookmarkGraphQL = graphql(`
mutation CreateBookmark($novelId: ID!, $chapterId: ID!) {
    createBookmark(novelId: $novelId, chapterId: $chapterId)
}
`)

export const createBookmarkMutation = {
    mutationKey: (novelId: string, chapterId: string) => ['createBookmark', novelId, chapterId],
    mutationFn: async ({ novelId, chapterId }: { novelId: string, chapterId: string }) => {
        return graphQLClient.request(createBookmarkGraphQL, { novelId: novelId, chapterId: chapterId });
    }
}

const createQuoteGraphQL = graphql(`
mutation CreateQuote($input: QuoteInput!) {
    createQuote(input: $input)
}
`)

export const createQuoteMutation = {
    mutationKey: (input: QuoteInput) => ['createBookmark', input],
    mutationFn: async ({novelId, chapterId, quote, chapter_number}: {novelId: string, chapterId: string, quote: string, chapter_number: number}) => {
        return graphQLClient.request(createQuoteGraphQL, { input: { novel_id: novelId, chapter_id: chapterId, quote: quote, chapter_number: chapter_number } });
    }
}

const searchNovelsGraphQL = graphql(`
query SearchNovels($where: QuerySearchNovelsWhereWhereConditions, $orderBy: [QuerySearchNovelsOrderByOrderByClause!]) {
    searchNovels(
        where: $where
        orderBy: $orderBy
    ) {
        id
        title
        image
        rating
        reads
        
        user {
            id
            name
        }

        favouritesCount
        commentsCount
        chaptersCount
    }
}
`)

export const searchNovelsQuery = {
  queryKey: (
      where: QuerySearchNovelsWhereWhereConditions, 
      orderBy: QuerySearchNovelsOrderByOrderByClause[]
  ) => ['searchNovels', where, orderBy],
  queryFn: async ({ queryKey }: { queryKey: any[] }) => {
    const [, where, orderBy] = queryKey;
    return graphQLClient.request(searchNovelsGraphQL, { where: where, orderBy: orderBy });
  }
}

const didUserRateGraphQL = graphql(`
query DidUserRate($novelId: ID!) {
  didUserRateNovel(novelId: $novelId) {
    exists
    rating
  }
}
`)

export const didUserRateQuery = {
    queryKey: (novelId: string) => ['didUserRate', novelId],
    queryFn: async ({ queryKey }: { queryKey: string[] }) => {
        const [, novelId] = queryKey;
        return graphQLClient.request(didUserRateGraphQL, { novelId: novelId })
    }
}


const rateNovelGraphQL = graphql(`
mutation RateNovel($novelId: ID!, $rating: Float!) {
    rateNovel(novelId: $novelId, rating: $rating) {
        exists
        rating
    }
}
`);

export const rateNovelMutation = {
    mutationKey: (novelId: string, rating: number) => ['RateNovel', novelId, rating],
    mutationFn: async ({novelId, rating}: {novelId: string, rating: number}) => {
        return graphQLClient.request(rateNovelGraphQL, { novelId: novelId, rating: rating });
    }
}

const deleteRatingGraphQL = graphql(`
mutation DeleteRating($novelId: ID!) {
    deleteRating(novelId: $novelId) {
        exists
        rating
    }
}
`);

export const deleteRatingMutation = {
    mutationKey: (novelId: string) => ['DeleteRating', novelId],
    mutationFn: async (novelId: string) => {
        return graphQLClient.request(deleteRatingGraphQL, { novelId: novelId });
    }
}

const updateReadingListGraphQL = graphql(`
  mutation UpdateReadingList($value: ReadingList!, $force: Boolean) {
    updateReadingList(value: $value, force: $force)
  }
`);

export const updateReadingListMutation = {
  mutationKey: ["updateReadingList"],
  mutationFn: async (input: { value: ReadingList, force?: boolean }) => {
    return graphQLClient.request(updateReadingListGraphQL, {
        value: input.value,
        force: input.force,
    });
  },
};

const incrementReadsGraphQL = graphql(`
  mutation IncrementReads($novelId: ID!) {
    incrementReads(novelId: $novelId)
  }
`);

export const incrementReadsMutation = {
  mutationKey: ["incrementReads"],
  mutationFn: async (input: { novelId: string }) => {
    return graphQLClient.request(incrementReadsGraphQL, {
        novelId: input.novelId,
    });
  },
};

const addFavouriteGraphQL = graphql(`
  mutation AddFavourite($novelId: ID!) {
    addFavourite(novelId: $novelId)
  }
`);

export const addFavouriteMutation = {
  mutationKey: ["addFavourite"],  mutationFn: async (input: { novelId: string }) => {
    return await graphQLClient.request(addFavouriteGraphQL, { novelId: input.novelId });
  }
};

const removeFavouriteGraphQL = graphql(`
  mutation RemoveFavourite($novelId: ID!) {
    removeFavourite(novelId: $novelId)
  }
`);

export const removeFavouriteMutation = {
  mutationKey: ["removeFavourite"],
  mutationFn: async (input: { novelId: string }) => {
    return await graphQLClient.request(removeFavouriteGraphQL, { novelId: input.novelId });
  }
};

const isFavouriteGraphQL = graphql(`
  query IsFavourite($novelId: ID!) {
    isFavourite(novelId: $novelId)
  }
`);

export const isFavouriteQuery = {
  queryKey: (novelId: string) => ["IsNovelFavourite", novelId],
  queryFn: async ({ queryKey }: { queryKey: string[] }) => {
    const [, novelId] = queryKey;
    return await graphQLClient.request(isFavouriteGraphQL, { novelId: novelId });
  }
}