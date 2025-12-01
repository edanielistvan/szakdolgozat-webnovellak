import { graphql } from "@/graphql";
import { graphQLClient } from "./graphql";

const getAuthorNovelsGraphQL = graphql(`
query GetAuthorNovels($userId: ID!) {
  getAuthorNovels(userId: $userId) {
    id
    user {
        id
        name
    }
    title
    image
  }
}
`);

export const getAuthorNovelsQuery = {
    queryKey: (userId: string) => ["getAuthorNovels", userId],
    queryFn: async ({ queryKey }: {queryKey: string[]} ) => {
        const [, userId] = queryKey;
        return graphQLClient.request(getAuthorNovelsGraphQL, { userId: userId });
    }
}

// --- GraphQL mutation to delete a novel ---
const deleteNovelGraphQL = graphql(`
mutation DeleteNovel($novelId: ID!) {
  deleteNovel(novelId: $novelId)
}
`);

export const deleteNovelMutation = {
    mutationKey: ['deleteNovel'],
    mutationFn: async (novelId: string) => {
        return graphQLClient.request(deleteNovelGraphQL, { novelId: novelId });
    }
}

const createNovelGraphQL = graphql(`
mutation CreateNovel($title: String!, $image: String, $description: String, $tags: [String!]!) {
    createNovel(title: $title, image: $image, description: $description, tags: $tags)
}
`);

export const createNovelMutation = {
  mutationKey: ["createNovel"],
  mutationFn: async (input: { title: string, image?: string, description?: string, tags: string[]}) => {
    return graphQLClient.request(createNovelGraphQL, {
      title: input.title,
      image: input.image ?? null,
      description: input.description ?? null,
      tags: input.tags,
    });
  },
};

const updateNovelGraphQL = graphql(`
mutation UpdateNovel($novelId: ID!, $title: String!, $image: String, $description: String, $tags: [String!]!) {
    updateNovel(novelId: $novelId, title: $title, image: $image, description: $description, tags: $tags)
}
`);

export const updateNovelMutation = {
  mutationKey: ["updateNovel"],
  mutationFn: async (input: { novelId: string, title: string, image?: string, description?: string, tags: string[]}) => {
    return graphQLClient.request(updateNovelGraphQL, {
        novelId: input.novelId,
        title: input.title,
        image: input.image ?? null,
        description: input.description ?? null,
        tags: input.tags,
    });
  },
};

const createChapterGraphQL = graphql(`
  mutation CreateChapter($novelId: ID!, $chapterNumber: Int) {
    createChapter(novelId: $novelId, chapterNumber: $chapterNumber)
  }
`);

export const createChapterMutation = {
  mutationKey: ["createChapter"],
  mutationFn: async (input: { novelId: string, chapterNumber?: number }) => {
    return graphQLClient.request(createChapterGraphQL, {
        novelId: input.novelId,
        chapterNumber: input.chapterNumber ?? null,
    });
  },
};

export type ChapterReorderInput = {
    id: string;      
    novelId: string; 
    number: number; 
}

const reorderChaptersGraphQL = graphql(`
  mutation ReorderChapters($reorder: [ChapterReorder!]!) {
    reorderChapters(reorder: $reorder)
  }
`);

export const reorderChaptersMutation = {
  mutationKey: ["reorderChapters"],
  mutationFn: async (input: { reorder: ChapterReorderInput[] }) => {
    return graphQLClient.request(reorderChaptersGraphQL, {
        reorder: input.reorder,
    });
  },
};

const updateChapterTitleAndTextGraphQL = graphql(`
  mutation UpdateChapterTitleAndText($chapterId: ID!, $title: String!, $text: String!) {
    updateChapterTitleAndText(chapterId: $chapterId, title: $title, text: $text)
  }
`);

export const updateChapterTitleAndTextMutation = {
  mutationKey: ["updateChapterContent"],
  mutationFn: async (input: { chapterId: string, title: string, text: string }) => {
    return graphQLClient.request(updateChapterTitleAndTextGraphQL, {
        chapterId: input.chapterId,
        title: input.title,
        text: input.text,
    });
  },
};

const deleteChapterGraphQL = graphql(`
  mutation DeleteChapter($chapterId: ID!) {
    deleteChapter(chapterId: $chapterId)
  }
`);

export const deleteChapterMutation = {
  mutationKey: ["deleteChapter"],
  mutationFn: async (input: { chapterId: string }) => {
    return graphQLClient.request(deleteChapterGraphQL, {
        chapterId: input.chapterId,
    });
  },
};