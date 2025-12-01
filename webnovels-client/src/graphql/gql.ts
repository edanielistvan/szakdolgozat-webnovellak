/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery Users($search: String, $orderBy: QueryUsersOrderByColumn!, $orderDir: SortOrder!) {\n    users(search: $search, orderBy: [{column: $orderBy, order: $orderDir}]) {\n        id \n        name \n        email \n        role \n        banned\n        password_reset\n        created_at\n        writer_request\n    }\n}\n": typeof types.UsersDocument,
    "\nquery Reports {\n  reports {\n    id\n    comment {\n      id\n      text\n    }\n    reporter {\n      id\n      name\n    }\n    commenter {\n      id\n      name\n    }\n    created_at\n  }\n}\n": typeof types.ReportsDocument,
    "\nmutation ReportComment($commentId: ID!) {\n  reportComment(commentId: $commentId)\n}\n": typeof types.ReportCommentDocument,
    "\nmutation SwapUserRole($userId: ID!) {\n    swapUserRole(userId: $userId)\n}\n": typeof types.SwapUserRoleDocument,
    "\nmutation ToggleBanUser($userId: ID!) {\n    toggleBanUser(userId: $userId)\n}\n": typeof types.ToggleBanUserDocument,
    "\nmutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId)\n}\n": typeof types.DeleteUserDocument,
    "\nmutation DismissReport($commentId: ID!) {\n    dismissReport(commentId: $commentId)\n}\n": typeof types.DismissReportDocument,
    "\nmutation RemoveComment($commentId: ID!) {\n    removeComment(commentId: $commentId)\n}\n": typeof types.RemoveCommentDocument,
    "\nquery CurrentUser {\n  me {\n    id\n    name\n    email\n    role\n    created_at\n  }\n}": typeof types.CurrentUserDocument,
    "\nmutation Register($input: RegisterInput!) {\n    register(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n": typeof types.RegisterDocument,
    "\nmutation Login($input: LoginInput!) {\n    login(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n": typeof types.LoginDocument,
    "\nmutation Logout {\n    logout {\n        id\n    }\n}\n": typeof types.LogoutDocument,
    "\nquery MostReadWebnovels {\n    mostReadWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        user {\n            id\n            name\n        }\n    }\n}\n": typeof types.MostReadWebnovelsDocument,
    "\nquery LongestWebnovels {\n    longestWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}": typeof types.LongestWebnovelsDocument,
    "\nquery MostLikedWebnovels {\n    mostLikedWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}": typeof types.MostLikedWebnovelsDocument,
    "\nquery GetNovel($id: ID!) {\n    getNovel(id:$id) {\n        id\n        user {\n            id\n            name\n        }\n        title\n        description\n        image\n        rating\n        reads\n        chapters {\n            id\n            number\n            title\n        }\n        tags {\n            name\n        }\n    }\n}\n": typeof types.GetNovelDocument,
    "\nquery GetComments($novelId: ID!) {\n    getComments(novelId:$novelId) {\n        id\n        user {\n            id\n            name\n        }\n        text\n        upvotes\n        downvotes\n        userVote\n        replies {\n            id\n            user {\n                id\n                name\n            }\n            text\n            upvotes\n            downvotes\n            userVote\n        }\n    }\n}\n": typeof types.GetCommentsDocument,
    "\nmutation CreateComment($novelId: ID!, $parentId: ID, $text: String!) {\n    createComment(novelId: $novelId, parentId: $parentId, text: $text)\n}  \n": typeof types.CreateCommentDocument,
    "\nmutation DoVote($commentId: ID!, $value: Int!) {\n    doVote(commentId: $commentId, value: $value)\n}  \n": typeof types.DoVoteDocument,
    "\nmutation RemoveVote($commentId: ID!) {\n    removeVote(commentId: $commentId)\n}  \n": typeof types.RemoveVoteDocument,
    "\nquery GetChapter($id: ID!) {\n    getChapter(id:$id) {\n        number\n        title\n        text\n        \n        novel {\n            id\n            rating\n            title\n            chapters {\n                id\n                number\n                title\n            }\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n": typeof types.GetChapterDocument,
    "\nquery GetBookmark($novelId: ID!) {\n    getBookmark(novelId: $novelId) {\n        chapter_id\n    }\n}  \n": typeof types.GetBookmarkDocument,
    "\nmutation CreateBookmark($novelId: ID!, $chapterId: ID!) {\n    createBookmark(novelId: $novelId, chapterId: $chapterId)\n}\n": typeof types.CreateBookmarkDocument,
    "\nmutation CreateQuote($input: QuoteInput!) {\n    createQuote(input: $input)\n}\n": typeof types.CreateQuoteDocument,
    "\nquery SearchNovels($where: QuerySearchNovelsWhereWhereConditions, $orderBy: [QuerySearchNovelsOrderByOrderByClause!]) {\n    searchNovels(\n        where: $where\n        orderBy: $orderBy\n    ) {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n\n        favouritesCount\n        commentsCount\n        chaptersCount\n    }\n}\n": typeof types.SearchNovelsDocument,
    "\nquery DidUserRate($novelId: ID!) {\n  didUserRateNovel(novelId: $novelId) {\n    exists\n    rating\n  }\n}\n": typeof types.DidUserRateDocument,
    "\nmutation RateNovel($novelId: ID!, $rating: Float!) {\n    rateNovel(novelId: $novelId, rating: $rating) {\n        exists\n        rating\n    }\n}\n": typeof types.RateNovelDocument,
    "\nmutation DeleteRating($novelId: ID!) {\n    deleteRating(novelId: $novelId) {\n        exists\n        rating\n    }\n}\n": typeof types.DeleteRatingDocument,
    "\n  mutation UpdateReadingList($value: ReadingList!, $force: Boolean) {\n    updateReadingList(value: $value, force: $force)\n  }\n": typeof types.UpdateReadingListDocument,
    "\n  mutation IncrementReads($novelId: ID!) {\n    incrementReads(novelId: $novelId)\n  }\n": typeof types.IncrementReadsDocument,
    "\n  mutation AddFavourite($novelId: ID!) {\n    addFavourite(novelId: $novelId)\n  }\n": typeof types.AddFavouriteDocument,
    "\n  mutation RemoveFavourite($novelId: ID!) {\n    removeFavourite(novelId: $novelId)\n  }\n": typeof types.RemoveFavouriteDocument,
    "\n  query IsFavourite($novelId: ID!) {\n    isFavourite(novelId: $novelId)\n  }\n": typeof types.IsFavouriteDocument,
    "\nquery UserProfile($id: ID!) {\n    userProfile(id:$id) {\n        user {\n            id\n            name\n            email\n            role\n            created_at\n            writer_request\n        }\n        is_writer\n        favourites {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n        novels {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n": typeof types.UserProfileDocument,
    "\nquery UserReadingList($id: ID!) {\n    userReadingList(id: $id) {\n        id\n        novel_id,\n        novel_title,\n        chapter_id,\n        chapter_title\n        chapter_number,\n        chapters_max\n    }\n}": typeof types.UserReadingListDocument,
    "\nquery UserQuotes($id: ID!) {\n    userQuotes(user_id:$id) {\n        quote\n        novel {\n            title\n        }\n        chapter {\n            title\n            number\n        }\n    }\n}": typeof types.UserQuotesDocument,
    "\nmutation RequestWriterRole {\n  requestWriterRole\n}\n": typeof types.RequestWriterRoleDocument,
    "\nquery GetAuthorNovels($userId: ID!) {\n  getAuthorNovels(userId: $userId) {\n    id\n    user {\n        id\n        name\n    }\n    title\n    image\n  }\n}\n": typeof types.GetAuthorNovelsDocument,
    "\nmutation DeleteNovel($novelId: ID!) {\n  deleteNovel(novelId: $novelId)\n}\n": typeof types.DeleteNovelDocument,
    "\nmutation CreateNovel($title: String!, $image: String, $description: String, $tags: [String!]!) {\n    createNovel(title: $title, image: $image, description: $description, tags: $tags)\n}\n": typeof types.CreateNovelDocument,
    "\nmutation UpdateNovel($novelId: ID!, $title: String!, $image: String, $description: String, $tags: [String!]!) {\n    updateNovel(novelId: $novelId, title: $title, image: $image, description: $description, tags: $tags)\n}\n": typeof types.UpdateNovelDocument,
    "\n  mutation CreateChapter($novelId: ID!, $chapterNumber: Int) {\n    createChapter(novelId: $novelId, chapterNumber: $chapterNumber)\n  }\n": typeof types.CreateChapterDocument,
    "\n  mutation ReorderChapters($reorder: [ChapterReorder!]!) {\n    reorderChapters(reorder: $reorder)\n  }\n": typeof types.ReorderChaptersDocument,
    "\n  mutation UpdateChapterTitleAndText($chapterId: ID!, $title: String!, $text: String!) {\n    updateChapterTitleAndText(chapterId: $chapterId, title: $title, text: $text)\n  }\n": typeof types.UpdateChapterTitleAndTextDocument,
    "\n  mutation DeleteChapter($chapterId: ID!) {\n    deleteChapter(chapterId: $chapterId)\n  }\n": typeof types.DeleteChapterDocument,
};
const documents: Documents = {
    "\nquery Users($search: String, $orderBy: QueryUsersOrderByColumn!, $orderDir: SortOrder!) {\n    users(search: $search, orderBy: [{column: $orderBy, order: $orderDir}]) {\n        id \n        name \n        email \n        role \n        banned\n        password_reset\n        created_at\n        writer_request\n    }\n}\n": types.UsersDocument,
    "\nquery Reports {\n  reports {\n    id\n    comment {\n      id\n      text\n    }\n    reporter {\n      id\n      name\n    }\n    commenter {\n      id\n      name\n    }\n    created_at\n  }\n}\n": types.ReportsDocument,
    "\nmutation ReportComment($commentId: ID!) {\n  reportComment(commentId: $commentId)\n}\n": types.ReportCommentDocument,
    "\nmutation SwapUserRole($userId: ID!) {\n    swapUserRole(userId: $userId)\n}\n": types.SwapUserRoleDocument,
    "\nmutation ToggleBanUser($userId: ID!) {\n    toggleBanUser(userId: $userId)\n}\n": types.ToggleBanUserDocument,
    "\nmutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId)\n}\n": types.DeleteUserDocument,
    "\nmutation DismissReport($commentId: ID!) {\n    dismissReport(commentId: $commentId)\n}\n": types.DismissReportDocument,
    "\nmutation RemoveComment($commentId: ID!) {\n    removeComment(commentId: $commentId)\n}\n": types.RemoveCommentDocument,
    "\nquery CurrentUser {\n  me {\n    id\n    name\n    email\n    role\n    created_at\n  }\n}": types.CurrentUserDocument,
    "\nmutation Register($input: RegisterInput!) {\n    register(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n": types.RegisterDocument,
    "\nmutation Login($input: LoginInput!) {\n    login(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n": types.LoginDocument,
    "\nmutation Logout {\n    logout {\n        id\n    }\n}\n": types.LogoutDocument,
    "\nquery MostReadWebnovels {\n    mostReadWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        user {\n            id\n            name\n        }\n    }\n}\n": types.MostReadWebnovelsDocument,
    "\nquery LongestWebnovels {\n    longestWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}": types.LongestWebnovelsDocument,
    "\nquery MostLikedWebnovels {\n    mostLikedWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}": types.MostLikedWebnovelsDocument,
    "\nquery GetNovel($id: ID!) {\n    getNovel(id:$id) {\n        id\n        user {\n            id\n            name\n        }\n        title\n        description\n        image\n        rating\n        reads\n        chapters {\n            id\n            number\n            title\n        }\n        tags {\n            name\n        }\n    }\n}\n": types.GetNovelDocument,
    "\nquery GetComments($novelId: ID!) {\n    getComments(novelId:$novelId) {\n        id\n        user {\n            id\n            name\n        }\n        text\n        upvotes\n        downvotes\n        userVote\n        replies {\n            id\n            user {\n                id\n                name\n            }\n            text\n            upvotes\n            downvotes\n            userVote\n        }\n    }\n}\n": types.GetCommentsDocument,
    "\nmutation CreateComment($novelId: ID!, $parentId: ID, $text: String!) {\n    createComment(novelId: $novelId, parentId: $parentId, text: $text)\n}  \n": types.CreateCommentDocument,
    "\nmutation DoVote($commentId: ID!, $value: Int!) {\n    doVote(commentId: $commentId, value: $value)\n}  \n": types.DoVoteDocument,
    "\nmutation RemoveVote($commentId: ID!) {\n    removeVote(commentId: $commentId)\n}  \n": types.RemoveVoteDocument,
    "\nquery GetChapter($id: ID!) {\n    getChapter(id:$id) {\n        number\n        title\n        text\n        \n        novel {\n            id\n            rating\n            title\n            chapters {\n                id\n                number\n                title\n            }\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n": types.GetChapterDocument,
    "\nquery GetBookmark($novelId: ID!) {\n    getBookmark(novelId: $novelId) {\n        chapter_id\n    }\n}  \n": types.GetBookmarkDocument,
    "\nmutation CreateBookmark($novelId: ID!, $chapterId: ID!) {\n    createBookmark(novelId: $novelId, chapterId: $chapterId)\n}\n": types.CreateBookmarkDocument,
    "\nmutation CreateQuote($input: QuoteInput!) {\n    createQuote(input: $input)\n}\n": types.CreateQuoteDocument,
    "\nquery SearchNovels($where: QuerySearchNovelsWhereWhereConditions, $orderBy: [QuerySearchNovelsOrderByOrderByClause!]) {\n    searchNovels(\n        where: $where\n        orderBy: $orderBy\n    ) {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n\n        favouritesCount\n        commentsCount\n        chaptersCount\n    }\n}\n": types.SearchNovelsDocument,
    "\nquery DidUserRate($novelId: ID!) {\n  didUserRateNovel(novelId: $novelId) {\n    exists\n    rating\n  }\n}\n": types.DidUserRateDocument,
    "\nmutation RateNovel($novelId: ID!, $rating: Float!) {\n    rateNovel(novelId: $novelId, rating: $rating) {\n        exists\n        rating\n    }\n}\n": types.RateNovelDocument,
    "\nmutation DeleteRating($novelId: ID!) {\n    deleteRating(novelId: $novelId) {\n        exists\n        rating\n    }\n}\n": types.DeleteRatingDocument,
    "\n  mutation UpdateReadingList($value: ReadingList!, $force: Boolean) {\n    updateReadingList(value: $value, force: $force)\n  }\n": types.UpdateReadingListDocument,
    "\n  mutation IncrementReads($novelId: ID!) {\n    incrementReads(novelId: $novelId)\n  }\n": types.IncrementReadsDocument,
    "\n  mutation AddFavourite($novelId: ID!) {\n    addFavourite(novelId: $novelId)\n  }\n": types.AddFavouriteDocument,
    "\n  mutation RemoveFavourite($novelId: ID!) {\n    removeFavourite(novelId: $novelId)\n  }\n": types.RemoveFavouriteDocument,
    "\n  query IsFavourite($novelId: ID!) {\n    isFavourite(novelId: $novelId)\n  }\n": types.IsFavouriteDocument,
    "\nquery UserProfile($id: ID!) {\n    userProfile(id:$id) {\n        user {\n            id\n            name\n            email\n            role\n            created_at\n            writer_request\n        }\n        is_writer\n        favourites {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n        novels {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n": types.UserProfileDocument,
    "\nquery UserReadingList($id: ID!) {\n    userReadingList(id: $id) {\n        id\n        novel_id,\n        novel_title,\n        chapter_id,\n        chapter_title\n        chapter_number,\n        chapters_max\n    }\n}": types.UserReadingListDocument,
    "\nquery UserQuotes($id: ID!) {\n    userQuotes(user_id:$id) {\n        quote\n        novel {\n            title\n        }\n        chapter {\n            title\n            number\n        }\n    }\n}": types.UserQuotesDocument,
    "\nmutation RequestWriterRole {\n  requestWriterRole\n}\n": types.RequestWriterRoleDocument,
    "\nquery GetAuthorNovels($userId: ID!) {\n  getAuthorNovels(userId: $userId) {\n    id\n    user {\n        id\n        name\n    }\n    title\n    image\n  }\n}\n": types.GetAuthorNovelsDocument,
    "\nmutation DeleteNovel($novelId: ID!) {\n  deleteNovel(novelId: $novelId)\n}\n": types.DeleteNovelDocument,
    "\nmutation CreateNovel($title: String!, $image: String, $description: String, $tags: [String!]!) {\n    createNovel(title: $title, image: $image, description: $description, tags: $tags)\n}\n": types.CreateNovelDocument,
    "\nmutation UpdateNovel($novelId: ID!, $title: String!, $image: String, $description: String, $tags: [String!]!) {\n    updateNovel(novelId: $novelId, title: $title, image: $image, description: $description, tags: $tags)\n}\n": types.UpdateNovelDocument,
    "\n  mutation CreateChapter($novelId: ID!, $chapterNumber: Int) {\n    createChapter(novelId: $novelId, chapterNumber: $chapterNumber)\n  }\n": types.CreateChapterDocument,
    "\n  mutation ReorderChapters($reorder: [ChapterReorder!]!) {\n    reorderChapters(reorder: $reorder)\n  }\n": types.ReorderChaptersDocument,
    "\n  mutation UpdateChapterTitleAndText($chapterId: ID!, $title: String!, $text: String!) {\n    updateChapterTitleAndText(chapterId: $chapterId, title: $title, text: $text)\n  }\n": types.UpdateChapterTitleAndTextDocument,
    "\n  mutation DeleteChapter($chapterId: ID!) {\n    deleteChapter(chapterId: $chapterId)\n  }\n": types.DeleteChapterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Users($search: String, $orderBy: QueryUsersOrderByColumn!, $orderDir: SortOrder!) {\n    users(search: $search, orderBy: [{column: $orderBy, order: $orderDir}]) {\n        id \n        name \n        email \n        role \n        banned\n        password_reset\n        created_at\n        writer_request\n    }\n}\n"): (typeof documents)["\nquery Users($search: String, $orderBy: QueryUsersOrderByColumn!, $orderDir: SortOrder!) {\n    users(search: $search, orderBy: [{column: $orderBy, order: $orderDir}]) {\n        id \n        name \n        email \n        role \n        banned\n        password_reset\n        created_at\n        writer_request\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Reports {\n  reports {\n    id\n    comment {\n      id\n      text\n    }\n    reporter {\n      id\n      name\n    }\n    commenter {\n      id\n      name\n    }\n    created_at\n  }\n}\n"): (typeof documents)["\nquery Reports {\n  reports {\n    id\n    comment {\n      id\n      text\n    }\n    reporter {\n      id\n      name\n    }\n    commenter {\n      id\n      name\n    }\n    created_at\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ReportComment($commentId: ID!) {\n  reportComment(commentId: $commentId)\n}\n"): (typeof documents)["\nmutation ReportComment($commentId: ID!) {\n  reportComment(commentId: $commentId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation SwapUserRole($userId: ID!) {\n    swapUserRole(userId: $userId)\n}\n"): (typeof documents)["\nmutation SwapUserRole($userId: ID!) {\n    swapUserRole(userId: $userId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ToggleBanUser($userId: ID!) {\n    toggleBanUser(userId: $userId)\n}\n"): (typeof documents)["\nmutation ToggleBanUser($userId: ID!) {\n    toggleBanUser(userId: $userId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId)\n}\n"): (typeof documents)["\nmutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DismissReport($commentId: ID!) {\n    dismissReport(commentId: $commentId)\n}\n"): (typeof documents)["\nmutation DismissReport($commentId: ID!) {\n    dismissReport(commentId: $commentId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveComment($commentId: ID!) {\n    removeComment(commentId: $commentId)\n}\n"): (typeof documents)["\nmutation RemoveComment($commentId: ID!) {\n    removeComment(commentId: $commentId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery CurrentUser {\n  me {\n    id\n    name\n    email\n    role\n    created_at\n  }\n}"): (typeof documents)["\nquery CurrentUser {\n  me {\n    id\n    name\n    email\n    role\n    created_at\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Register($input: RegisterInput!) {\n    register(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n"): (typeof documents)["\nmutation Register($input: RegisterInput!) {\n    register(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Login($input: LoginInput!) {\n    login(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n"): (typeof documents)["\nmutation Login($input: LoginInput!) {\n    login(input: $input) {\n        id\n        name\n        email\n        role\n        created_at\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Logout {\n    logout {\n        id\n    }\n}\n"): (typeof documents)["\nmutation Logout {\n    logout {\n        id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery MostReadWebnovels {\n    mostReadWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        user {\n            id\n            name\n        }\n    }\n}\n"): (typeof documents)["\nquery MostReadWebnovels {\n    mostReadWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        user {\n            id\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery LongestWebnovels {\n    longestWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}"): (typeof documents)["\nquery LongestWebnovels {\n    longestWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery MostLikedWebnovels {\n    mostLikedWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}"): (typeof documents)["\nquery MostLikedWebnovels {\n    mostLikedWebnovels {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetNovel($id: ID!) {\n    getNovel(id:$id) {\n        id\n        user {\n            id\n            name\n        }\n        title\n        description\n        image\n        rating\n        reads\n        chapters {\n            id\n            number\n            title\n        }\n        tags {\n            name\n        }\n    }\n}\n"): (typeof documents)["\nquery GetNovel($id: ID!) {\n    getNovel(id:$id) {\n        id\n        user {\n            id\n            name\n        }\n        title\n        description\n        image\n        rating\n        reads\n        chapters {\n            id\n            number\n            title\n        }\n        tags {\n            name\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetComments($novelId: ID!) {\n    getComments(novelId:$novelId) {\n        id\n        user {\n            id\n            name\n        }\n        text\n        upvotes\n        downvotes\n        userVote\n        replies {\n            id\n            user {\n                id\n                name\n            }\n            text\n            upvotes\n            downvotes\n            userVote\n        }\n    }\n}\n"): (typeof documents)["\nquery GetComments($novelId: ID!) {\n    getComments(novelId:$novelId) {\n        id\n        user {\n            id\n            name\n        }\n        text\n        upvotes\n        downvotes\n        userVote\n        replies {\n            id\n            user {\n                id\n                name\n            }\n            text\n            upvotes\n            downvotes\n            userVote\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateComment($novelId: ID!, $parentId: ID, $text: String!) {\n    createComment(novelId: $novelId, parentId: $parentId, text: $text)\n}  \n"): (typeof documents)["\nmutation CreateComment($novelId: ID!, $parentId: ID, $text: String!) {\n    createComment(novelId: $novelId, parentId: $parentId, text: $text)\n}  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DoVote($commentId: ID!, $value: Int!) {\n    doVote(commentId: $commentId, value: $value)\n}  \n"): (typeof documents)["\nmutation DoVote($commentId: ID!, $value: Int!) {\n    doVote(commentId: $commentId, value: $value)\n}  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RemoveVote($commentId: ID!) {\n    removeVote(commentId: $commentId)\n}  \n"): (typeof documents)["\nmutation RemoveVote($commentId: ID!) {\n    removeVote(commentId: $commentId)\n}  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetChapter($id: ID!) {\n    getChapter(id:$id) {\n        number\n        title\n        text\n        \n        novel {\n            id\n            rating\n            title\n            chapters {\n                id\n                number\n                title\n            }\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery GetChapter($id: ID!) {\n    getChapter(id:$id) {\n        number\n        title\n        text\n        \n        novel {\n            id\n            rating\n            title\n            chapters {\n                id\n                number\n                title\n            }\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetBookmark($novelId: ID!) {\n    getBookmark(novelId: $novelId) {\n        chapter_id\n    }\n}  \n"): (typeof documents)["\nquery GetBookmark($novelId: ID!) {\n    getBookmark(novelId: $novelId) {\n        chapter_id\n    }\n}  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateBookmark($novelId: ID!, $chapterId: ID!) {\n    createBookmark(novelId: $novelId, chapterId: $chapterId)\n}\n"): (typeof documents)["\nmutation CreateBookmark($novelId: ID!, $chapterId: ID!) {\n    createBookmark(novelId: $novelId, chapterId: $chapterId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateQuote($input: QuoteInput!) {\n    createQuote(input: $input)\n}\n"): (typeof documents)["\nmutation CreateQuote($input: QuoteInput!) {\n    createQuote(input: $input)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery SearchNovels($where: QuerySearchNovelsWhereWhereConditions, $orderBy: [QuerySearchNovelsOrderByOrderByClause!]) {\n    searchNovels(\n        where: $where\n        orderBy: $orderBy\n    ) {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n\n        favouritesCount\n        commentsCount\n        chaptersCount\n    }\n}\n"): (typeof documents)["\nquery SearchNovels($where: QuerySearchNovelsWhereWhereConditions, $orderBy: [QuerySearchNovelsOrderByOrderByClause!]) {\n    searchNovels(\n        where: $where\n        orderBy: $orderBy\n    ) {\n        id\n        title\n        image\n        rating\n        reads\n        \n        user {\n            id\n            name\n        }\n\n        favouritesCount\n        commentsCount\n        chaptersCount\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery DidUserRate($novelId: ID!) {\n  didUserRateNovel(novelId: $novelId) {\n    exists\n    rating\n  }\n}\n"): (typeof documents)["\nquery DidUserRate($novelId: ID!) {\n  didUserRateNovel(novelId: $novelId) {\n    exists\n    rating\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RateNovel($novelId: ID!, $rating: Float!) {\n    rateNovel(novelId: $novelId, rating: $rating) {\n        exists\n        rating\n    }\n}\n"): (typeof documents)["\nmutation RateNovel($novelId: ID!, $rating: Float!) {\n    rateNovel(novelId: $novelId, rating: $rating) {\n        exists\n        rating\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteRating($novelId: ID!) {\n    deleteRating(novelId: $novelId) {\n        exists\n        rating\n    }\n}\n"): (typeof documents)["\nmutation DeleteRating($novelId: ID!) {\n    deleteRating(novelId: $novelId) {\n        exists\n        rating\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateReadingList($value: ReadingList!, $force: Boolean) {\n    updateReadingList(value: $value, force: $force)\n  }\n"): (typeof documents)["\n  mutation UpdateReadingList($value: ReadingList!, $force: Boolean) {\n    updateReadingList(value: $value, force: $force)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation IncrementReads($novelId: ID!) {\n    incrementReads(novelId: $novelId)\n  }\n"): (typeof documents)["\n  mutation IncrementReads($novelId: ID!) {\n    incrementReads(novelId: $novelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFavourite($novelId: ID!) {\n    addFavourite(novelId: $novelId)\n  }\n"): (typeof documents)["\n  mutation AddFavourite($novelId: ID!) {\n    addFavourite(novelId: $novelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFavourite($novelId: ID!) {\n    removeFavourite(novelId: $novelId)\n  }\n"): (typeof documents)["\n  mutation RemoveFavourite($novelId: ID!) {\n    removeFavourite(novelId: $novelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsFavourite($novelId: ID!) {\n    isFavourite(novelId: $novelId)\n  }\n"): (typeof documents)["\n  query IsFavourite($novelId: ID!) {\n    isFavourite(novelId: $novelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery UserProfile($id: ID!) {\n    userProfile(id:$id) {\n        user {\n            id\n            name\n            email\n            role\n            created_at\n            writer_request\n        }\n        is_writer\n        favourites {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n        novels {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n"): (typeof documents)["\nquery UserProfile($id: ID!) {\n    userProfile(id:$id) {\n        user {\n            id\n            name\n            email\n            role\n            created_at\n            writer_request\n        }\n        is_writer\n        favourites {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n        novels {\n            id\n            title\n            description\n            image\n            rating\n            reads\n            user {\n                id\n                name\n            }\n        }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery UserReadingList($id: ID!) {\n    userReadingList(id: $id) {\n        id\n        novel_id,\n        novel_title,\n        chapter_id,\n        chapter_title\n        chapter_number,\n        chapters_max\n    }\n}"): (typeof documents)["\nquery UserReadingList($id: ID!) {\n    userReadingList(id: $id) {\n        id\n        novel_id,\n        novel_title,\n        chapter_id,\n        chapter_title\n        chapter_number,\n        chapters_max\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery UserQuotes($id: ID!) {\n    userQuotes(user_id:$id) {\n        quote\n        novel {\n            title\n        }\n        chapter {\n            title\n            number\n        }\n    }\n}"): (typeof documents)["\nquery UserQuotes($id: ID!) {\n    userQuotes(user_id:$id) {\n        quote\n        novel {\n            title\n        }\n        chapter {\n            title\n            number\n        }\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation RequestWriterRole {\n  requestWriterRole\n}\n"): (typeof documents)["\nmutation RequestWriterRole {\n  requestWriterRole\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAuthorNovels($userId: ID!) {\n  getAuthorNovels(userId: $userId) {\n    id\n    user {\n        id\n        name\n    }\n    title\n    image\n  }\n}\n"): (typeof documents)["\nquery GetAuthorNovels($userId: ID!) {\n  getAuthorNovels(userId: $userId) {\n    id\n    user {\n        id\n        name\n    }\n    title\n    image\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteNovel($novelId: ID!) {\n  deleteNovel(novelId: $novelId)\n}\n"): (typeof documents)["\nmutation DeleteNovel($novelId: ID!) {\n  deleteNovel(novelId: $novelId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateNovel($title: String!, $image: String, $description: String, $tags: [String!]!) {\n    createNovel(title: $title, image: $image, description: $description, tags: $tags)\n}\n"): (typeof documents)["\nmutation CreateNovel($title: String!, $image: String, $description: String, $tags: [String!]!) {\n    createNovel(title: $title, image: $image, description: $description, tags: $tags)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateNovel($novelId: ID!, $title: String!, $image: String, $description: String, $tags: [String!]!) {\n    updateNovel(novelId: $novelId, title: $title, image: $image, description: $description, tags: $tags)\n}\n"): (typeof documents)["\nmutation UpdateNovel($novelId: ID!, $title: String!, $image: String, $description: String, $tags: [String!]!) {\n    updateNovel(novelId: $novelId, title: $title, image: $image, description: $description, tags: $tags)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChapter($novelId: ID!, $chapterNumber: Int) {\n    createChapter(novelId: $novelId, chapterNumber: $chapterNumber)\n  }\n"): (typeof documents)["\n  mutation CreateChapter($novelId: ID!, $chapterNumber: Int) {\n    createChapter(novelId: $novelId, chapterNumber: $chapterNumber)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReorderChapters($reorder: [ChapterReorder!]!) {\n    reorderChapters(reorder: $reorder)\n  }\n"): (typeof documents)["\n  mutation ReorderChapters($reorder: [ChapterReorder!]!) {\n    reorderChapters(reorder: $reorder)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateChapterTitleAndText($chapterId: ID!, $title: String!, $text: String!) {\n    updateChapterTitleAndText(chapterId: $chapterId, title: $title, text: $text)\n  }\n"): (typeof documents)["\n  mutation UpdateChapterTitleAndText($chapterId: ID!, $title: String!, $text: String!) {\n    updateChapterTitleAndText(chapterId: $chapterId, title: $title, text: $text)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChapter($chapterId: ID!) {\n    deleteChapter(chapterId: $chapterId)\n  }\n"): (typeof documents)["\n  mutation DeleteChapter($chapterId: ID!) {\n    deleteChapter(chapterId: $chapterId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;