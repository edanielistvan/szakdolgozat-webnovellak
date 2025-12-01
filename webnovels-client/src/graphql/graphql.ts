/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: { input: any; output: any; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  chapter_id: Scalars['ID']['output'];
  novel_id: Scalars['ID']['output'];
  page_index: Scalars['Int']['output'];
  user_id: Scalars['ID']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  id: Scalars['ID']['output'];
  novel: Novel;
  number?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ChapterReorder = {
  id: Scalars['ID']['input'];
  novelId: Scalars['ID']['input'];
  number: Scalars['Int']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  downvotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  novel_id: Scalars['ID']['output'];
  parent_id?: Maybe<Scalars['ID']['output']>;
  replies: Array<Comment>;
  text: Scalars['String']['output'];
  upvotes: Scalars['Int']['output'];
  user: User;
  userVote: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavourite: Scalars['Boolean']['output'];
  createBookmark: Scalars['Boolean']['output'];
  createChapter: Scalars['ID']['output'];
  createComment: Scalars['Boolean']['output'];
  createNovel: Scalars['Boolean']['output'];
  createQuote: Scalars['ID']['output'];
  deleteChapter: Scalars['Boolean']['output'];
  deleteNovel: Scalars['Boolean']['output'];
  deleteQuote: Scalars['Boolean']['output'];
  deleteRating: UserNovelRatingCheck;
  deleteUser: Scalars['Boolean']['output'];
  dismissReport: Scalars['Boolean']['output'];
  doVote: Scalars['Boolean']['output'];
  incrementReads: Scalars['Boolean']['output'];
  login: User;
  logout?: Maybe<User>;
  rateNovel: UserNovelRatingCheck;
  register: User;
  removeComment: Scalars['Boolean']['output'];
  removeFavourite: Scalars['Boolean']['output'];
  removeVote: Scalars['Boolean']['output'];
  reorderChapters: Scalars['Boolean']['output'];
  reportComment: Scalars['Boolean']['output'];
  requestWriterRole: Scalars['Boolean']['output'];
  swapUserRole: Scalars['Boolean']['output'];
  toggleBanUser: Scalars['Boolean']['output'];
  updateChapterTitleAndText: Scalars['Boolean']['output'];
  updateNovel: Scalars['Boolean']['output'];
  updateReadingList: Scalars['Boolean']['output'];
};


export type MutationAddFavouriteArgs = {
  novelId: Scalars['ID']['input'];
};


export type MutationCreateBookmarkArgs = {
  chapterId: Scalars['ID']['input'];
  novelId: Scalars['ID']['input'];
};


export type MutationCreateChapterArgs = {
  chapterNumber?: InputMaybe<Scalars['Int']['input']>;
  novelId: Scalars['ID']['input'];
};


export type MutationCreateCommentArgs = {
  novelId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  text: Scalars['String']['input'];
};


export type MutationCreateNovelArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationCreateQuoteArgs = {
  input: QuoteInput;
};


export type MutationDeleteChapterArgs = {
  chapterId: Scalars['ID']['input'];
};


export type MutationDeleteNovelArgs = {
  novelId: Scalars['ID']['input'];
};


export type MutationDeleteQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRatingArgs = {
  novelId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationDismissReportArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationDoVoteArgs = {
  commentId: Scalars['ID']['input'];
  value: Scalars['Int']['input'];
};


export type MutationIncrementReadsArgs = {
  novelId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRateNovelArgs = {
  novelId: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationRemoveFavouriteArgs = {
  novelId: Scalars['ID']['input'];
};


export type MutationRemoveVoteArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationReorderChaptersArgs = {
  reorder: Array<ChapterReorder>;
};


export type MutationReportCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationSwapUserRoleArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationToggleBanUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationUpdateChapterTitleAndTextArgs = {
  chapterId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateNovelArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  novelId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationUpdateReadingListArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  value: ReadingList;
};

export type Novel = {
  __typename?: 'Novel';
  author: Scalars['String']['output'];
  chapters: Array<Chapter>;
  chaptersCount: Scalars['Int']['output'];
  commentsCount: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  favouritesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reads?: Maybe<Scalars['Int']['output']>;
  tagString?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  user?: Maybe<User>;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

export type Profile = {
  __typename?: 'Profile';
  favourites: Array<Novel>;
  is_writer?: Maybe<Scalars['Boolean']['output']>;
  novels: Array<Novel>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  didUserRateNovel: UserNovelRatingCheck;
  getAuthorNovels: Array<Novel>;
  getBookmark?: Maybe<Bookmark>;
  getChapter: Chapter;
  getComments: Array<Comment>;
  getNovel: Novel;
  isFavourite: Scalars['Boolean']['output'];
  longestWebnovels: Array<Novel>;
  me?: Maybe<User>;
  mostLikedWebnovels: Array<Novel>;
  mostReadWebnovels: Array<Novel>;
  reports: Array<Report>;
  searchNovels: Array<Novel>;
  user?: Maybe<User>;
  userProfile: Profile;
  userQuotes: Array<Quote>;
  userReadingList: Array<Maybe<UserReadingList>>;
  users: Array<User>;
};


export type QueryDidUserRateNovelArgs = {
  novelId: Scalars['ID']['input'];
};


export type QueryGetAuthorNovelsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetBookmarkArgs = {
  novelId: Scalars['ID']['input'];
};


export type QueryGetChapterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCommentsArgs = {
  novelId: Scalars['ID']['input'];
};


export type QueryGetNovelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsFavouriteArgs = {
  novelId: Scalars['ID']['input'];
};


export type QuerySearchNovelsArgs = {
  orderBy?: InputMaybe<Array<QuerySearchNovelsOrderByOrderByClause>>;
  where?: InputMaybe<QuerySearchNovelsWhereWhereConditions>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserQuotesArgs = {
  user_id: Scalars['ID']['input'];
};


export type QueryUserReadingListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Allowed column names for Query.searchNovels.orderBy. */
export enum QuerySearchNovelsOrderByColumn {
  ChaptersCount = 'CHAPTERS_COUNT',
  CommentsCount = 'COMMENTS_COUNT',
  FavouritesCount = 'FAVOURITES_COUNT',
  Rating = 'RATING',
  Reads = 'READS',
  Title = 'TITLE'
}

/** Order by clause for Query.searchNovels.orderBy. */
export type QuerySearchNovelsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QuerySearchNovelsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.searchNovels.where. */
export enum QuerySearchNovelsWhereColumn {
  Author = 'AUTHOR',
  TagString = 'TAG_STRING',
  Title = 'TITLE'
}

/** Dynamic WHERE conditions for the `where` argument of the query `searchNovels`. */
export type QuerySearchNovelsWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QuerySearchNovelsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QuerySearchNovelsWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QuerySearchNovelsWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QuerySearchNovelsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument of the query `searchNovels`. */
export type QuerySearchNovelsWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QuerySearchNovelsWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

/** Allowed column names for Query.users.orderBy. */
export enum QueryUsersOrderByColumn {
  Email = 'EMAIL',
  Name = 'NAME',
  Role = 'ROLE',
  WriterRequest = 'WRITER_REQUEST'
}

/** Order by clause for Query.users.orderBy. */
export type QueryUsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryUsersOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type Quote = {
  __typename?: 'Quote';
  chapter: Chapter;
  chapter_number?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  novel: Novel;
  quote: Scalars['String']['output'];
  user: User;
};

export type QuoteInput = {
  chapter_id: Scalars['ID']['input'];
  chapter_number?: InputMaybe<Scalars['Int']['input']>;
  novel_id: Scalars['ID']['input'];
  quote: Scalars['String']['input'];
};

export type ReadingList = {
  chapter_id: Scalars['ID']['input'];
  novel_id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};

export type Report = {
  __typename?: 'Report';
  comment: Comment;
  commenter: User;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  reporter: User;
  updated_at: Scalars['DateTime']['output'];
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE'
}

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  banned?: Maybe<Scalars['Boolean']['output']>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password_reset?: Maybe<Scalars['Boolean']['output']>;
  role: Scalars['String']['output'];
  writer_request?: Maybe<Scalars['Boolean']['output']>;
};

export type UserNovelRatingCheck = {
  __typename?: 'UserNovelRatingCheck';
  exists: Scalars['Boolean']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
};

export type UserReadingList = {
  __typename?: 'UserReadingList';
  chapter_id: Scalars['ID']['output'];
  chapter_number: Scalars['Int']['output'];
  chapter_title: Scalars['String']['output'];
  chapters_max: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  novel_id: Scalars['ID']['output'];
  novel_title: Scalars['String']['output'];
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<WhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<WhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<Scalars['String']['input']>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']['input']>;
  /** Additional condition logic. */
  condition?: InputMaybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String']['input'];
};

export type UsersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy: QueryUsersOrderByColumn;
  orderDir: SortOrder;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, role: string, banned?: boolean | null, password_reset?: boolean | null, created_at: any, writer_request?: boolean | null }> };

export type ReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReportsQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Report', id: string, created_at: any, comment: { __typename?: 'Comment', id: string, text: string }, reporter: { __typename?: 'User', id: string, name: string }, commenter: { __typename?: 'User', id: string, name: string } }> };

export type ReportCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type ReportCommentMutation = { __typename?: 'Mutation', reportComment: boolean };

export type SwapUserRoleMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type SwapUserRoleMutation = { __typename?: 'Mutation', swapUserRole: boolean };

export type ToggleBanUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ToggleBanUserMutation = { __typename?: 'Mutation', toggleBanUser: boolean };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type DismissReportMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DismissReportMutation = { __typename?: 'Mutation', dismissReport: boolean };

export type RemoveCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: boolean };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email: string, role: string, created_at: any } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, name: string, email: string, role: string, created_at: any } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, name: string, email: string, role: string, created_at: any } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string } | null };

export type MostReadWebnovelsQueryVariables = Exact<{ [key: string]: never; }>;


export type MostReadWebnovelsQuery = { __typename?: 'Query', mostReadWebnovels: Array<{ __typename?: 'Novel', id: string, title: string, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null }> };

export type LongestWebnovelsQueryVariables = Exact<{ [key: string]: never; }>;


export type LongestWebnovelsQuery = { __typename?: 'Query', longestWebnovels: Array<{ __typename?: 'Novel', id: string, title: string, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null }> };

export type MostLikedWebnovelsQueryVariables = Exact<{ [key: string]: never; }>;


export type MostLikedWebnovelsQuery = { __typename?: 'Query', mostLikedWebnovels: Array<{ __typename?: 'Novel', id: string, title: string, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null }> };

export type GetNovelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNovelQuery = { __typename?: 'Query', getNovel: { __typename?: 'Novel', id: string, title: string, description?: string | null, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null, chapters: Array<{ __typename?: 'Chapter', id: string, number?: number | null, title?: string | null }>, tags: Array<{ __typename?: 'Tag', name: string }> } };

export type GetCommentsQueryVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: string, text: string, upvotes: number, downvotes: number, userVote: number, user: { __typename?: 'User', id: string, name: string }, replies: Array<{ __typename?: 'Comment', id: string, text: string, upvotes: number, downvotes: number, userVote: number, user: { __typename?: 'User', id: string, name: string } }> }> };

export type CreateCommentMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  text: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type DoVoteMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
  value: Scalars['Int']['input'];
}>;


export type DoVoteMutation = { __typename?: 'Mutation', doVote: boolean };

export type RemoveVoteMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type RemoveVoteMutation = { __typename?: 'Mutation', removeVote: boolean };

export type GetChapterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChapterQuery = { __typename?: 'Query', getChapter: { __typename?: 'Chapter', number?: number | null, title?: string | null, text?: string | null, novel: { __typename?: 'Novel', id: string, rating?: number | null, title: string, chapters: Array<{ __typename?: 'Chapter', id: string, number?: number | null, title?: string | null }>, user?: { __typename?: 'User', id: string, name: string } | null } } };

export type GetBookmarkQueryVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type GetBookmarkQuery = { __typename?: 'Query', getBookmark?: { __typename?: 'Bookmark', chapter_id: string } | null };

export type CreateBookmarkMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
  chapterId: Scalars['ID']['input'];
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: boolean };

export type CreateQuoteMutationVariables = Exact<{
  input: QuoteInput;
}>;


export type CreateQuoteMutation = { __typename?: 'Mutation', createQuote: string };

export type SearchNovelsQueryVariables = Exact<{
  where?: InputMaybe<QuerySearchNovelsWhereWhereConditions>;
  orderBy?: InputMaybe<Array<QuerySearchNovelsOrderByOrderByClause> | QuerySearchNovelsOrderByOrderByClause>;
}>;


export type SearchNovelsQuery = { __typename?: 'Query', searchNovels: Array<{ __typename?: 'Novel', id: string, title: string, image?: string | null, rating?: number | null, reads?: number | null, favouritesCount: number, commentsCount: number, chaptersCount: number, user?: { __typename?: 'User', id: string, name: string } | null }> };

export type DidUserRateQueryVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type DidUserRateQuery = { __typename?: 'Query', didUserRateNovel: { __typename?: 'UserNovelRatingCheck', exists: boolean, rating?: number | null } };

export type RateNovelMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
}>;


export type RateNovelMutation = { __typename?: 'Mutation', rateNovel: { __typename?: 'UserNovelRatingCheck', exists: boolean, rating?: number | null } };

export type DeleteRatingMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type DeleteRatingMutation = { __typename?: 'Mutation', deleteRating: { __typename?: 'UserNovelRatingCheck', exists: boolean, rating?: number | null } };

export type UpdateReadingListMutationVariables = Exact<{
  value: ReadingList;
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateReadingListMutation = { __typename?: 'Mutation', updateReadingList: boolean };

export type IncrementReadsMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type IncrementReadsMutation = { __typename?: 'Mutation', incrementReads: boolean };

export type AddFavouriteMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type AddFavouriteMutation = { __typename?: 'Mutation', addFavourite: boolean };

export type RemoveFavouriteMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type RemoveFavouriteMutation = { __typename?: 'Mutation', removeFavourite: boolean };

export type IsFavouriteQueryVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type IsFavouriteQuery = { __typename?: 'Query', isFavourite: boolean };

export type UserProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'Profile', is_writer?: boolean | null, user?: { __typename?: 'User', id: string, name: string, email: string, role: string, created_at: any, writer_request?: boolean | null } | null, favourites: Array<{ __typename?: 'Novel', id: string, title: string, description?: string | null, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null }>, novels: Array<{ __typename?: 'Novel', id: string, title: string, description?: string | null, image?: string | null, rating?: number | null, reads?: number | null, user?: { __typename?: 'User', id: string, name: string } | null }> } };

export type UserReadingListQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserReadingListQuery = { __typename?: 'Query', userReadingList: Array<{ __typename?: 'UserReadingList', id: string, novel_id: string, novel_title: string, chapter_id: string, chapter_title: string, chapter_number: number, chapters_max: number } | null> };

export type UserQuotesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuotesQuery = { __typename?: 'Query', userQuotes: Array<{ __typename?: 'Quote', quote: string, novel: { __typename?: 'Novel', title: string }, chapter: { __typename?: 'Chapter', title?: string | null, number?: number | null } }> };

export type RequestWriterRoleMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestWriterRoleMutation = { __typename?: 'Mutation', requestWriterRole: boolean };

export type GetAuthorNovelsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetAuthorNovelsQuery = { __typename?: 'Query', getAuthorNovels: Array<{ __typename?: 'Novel', id: string, title: string, image?: string | null, user?: { __typename?: 'User', id: string, name: string } | null }> };

export type DeleteNovelMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
}>;


export type DeleteNovelMutation = { __typename?: 'Mutation', deleteNovel: boolean };

export type CreateNovelMutationVariables = Exact<{
  title: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateNovelMutation = { __typename?: 'Mutation', createNovel: boolean };

export type UpdateNovelMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateNovelMutation = { __typename?: 'Mutation', updateNovel: boolean };

export type CreateChapterMutationVariables = Exact<{
  novelId: Scalars['ID']['input'];
  chapterNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: string };

export type ReorderChaptersMutationVariables = Exact<{
  reorder: Array<ChapterReorder> | ChapterReorder;
}>;


export type ReorderChaptersMutation = { __typename?: 'Mutation', reorderChapters: boolean };

export type UpdateChapterTitleAndTextMutationVariables = Exact<{
  chapterId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateChapterTitleAndTextMutation = { __typename?: 'Mutation', updateChapterTitleAndText: boolean };

export type DeleteChapterMutationVariables = Exact<{
  chapterId: Scalars['ID']['input'];
}>;


export type DeleteChapterMutation = { __typename?: 'Mutation', deleteChapter: boolean };


export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUsersOrderByColumn"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDir"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"column"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDir"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"password_reset"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"writer_request"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const ReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reporter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"commenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<ReportsQuery, ReportsQueryVariables>;
export const ReportCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<ReportCommentMutation, ReportCommentMutationVariables>;
export const SwapUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SwapUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swapUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<SwapUserRoleMutation, SwapUserRoleMutationVariables>;
export const ToggleBanUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleBanUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleBanUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ToggleBanUserMutation, ToggleBanUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const DismissReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DismissReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dismissReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<DismissReportMutation, DismissReportMutationVariables>;
export const RemoveCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MostReadWebnovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MostReadWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mostReadWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MostReadWebnovelsQuery, MostReadWebnovelsQueryVariables>;
export const LongestWebnovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LongestWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longestWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LongestWebnovelsQuery, LongestWebnovelsQueryVariables>;
export const MostLikedWebnovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MostLikedWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mostLikedWebnovels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MostLikedWebnovelsQuery, MostLikedWebnovelsQueryVariables>;
export const GetNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetNovelQuery, GetNovelQueryVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"upvotes"}},{"kind":"Field","name":{"kind":"Name","value":"downvotes"}},{"kind":"Field","name":{"kind":"Name","value":"userVote"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"upvotes"}},{"kind":"Field","name":{"kind":"Name","value":"downvotes"}},{"kind":"Field","name":{"kind":"Name","value":"userVote"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DoVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DoVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}]}}]} as unknown as DocumentNode<DoVoteMutation, DoVoteMutationVariables>;
export const RemoveVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<RemoveVoteMutation, RemoveVoteMutationVariables>;
export const GetChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"novel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetChapterQuery, GetChapterQueryVariables>;
export const GetBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter_id"}}]}}]}}]} as unknown as DocumentNode<GetBookmarkQuery, GetBookmarkQueryVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}}]}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const CreateQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateQuoteMutation, CreateQuoteMutationVariables>;
export const SearchNovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchNovels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuerySearchNovelsWhereWhereConditions"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuerySearchNovelsOrderByOrderByClause"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchNovels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favouritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"chaptersCount"}}]}}]}}]} as unknown as DocumentNode<SearchNovelsQuery, SearchNovelsQueryVariables>;
export const DidUserRateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DidUserRate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"didUserRateNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]} as unknown as DocumentNode<DidUserRateQuery, DidUserRateQueryVariables>;
export const RateNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]} as unknown as DocumentNode<RateNovelMutation, RateNovelMutationVariables>;
export const DeleteRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]} as unknown as DocumentNode<DeleteRatingMutation, DeleteRatingMutationVariables>;
export const UpdateReadingListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateReadingList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReadingList"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateReadingList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}]}]}}]} as unknown as DocumentNode<UpdateReadingListMutation, UpdateReadingListMutationVariables>;
export const IncrementReadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncrementReads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incrementReads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}]}]}}]} as unknown as DocumentNode<IncrementReadsMutation, IncrementReadsMutationVariables>;
export const AddFavouriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavourite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFavourite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}]}]}}]} as unknown as DocumentNode<AddFavouriteMutation, AddFavouriteMutationVariables>;
export const RemoveFavouriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavourite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavourite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}]}]}}]} as unknown as DocumentNode<RemoveFavouriteMutation, RemoveFavouriteMutationVariables>;
export const IsFavouriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsFavourite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFavourite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}]}]}}]} as unknown as DocumentNode<IsFavouriteQuery, IsFavouriteQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"writer_request"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_writer"}},{"kind":"Field","name":{"kind":"Name","value":"favourites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"novels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reads"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UserReadingListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserReadingList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userReadingList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"novel_id"}},{"kind":"Field","name":{"kind":"Name","value":"novel_title"}},{"kind":"Field","name":{"kind":"Name","value":"chapter_id"}},{"kind":"Field","name":{"kind":"Name","value":"chapter_title"}},{"kind":"Field","name":{"kind":"Name","value":"chapter_number"}},{"kind":"Field","name":{"kind":"Name","value":"chapters_max"}}]}}]}}]} as unknown as DocumentNode<UserReadingListQuery, UserReadingListQueryVariables>;
export const UserQuotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserQuotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userQuotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"novel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuotesQuery, UserQuotesQueryVariables>;
export const RequestWriterRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestWriterRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestWriterRole"}}]}}]} as unknown as DocumentNode<RequestWriterRoleMutation, RequestWriterRoleMutationVariables>;
export const GetAuthorNovelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorNovels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthorNovels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<GetAuthorNovelsQuery, GetAuthorNovelsQueryVariables>;
export const DeleteNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}}]}]}}]} as unknown as DocumentNode<DeleteNovelMutation, DeleteNovelMutationVariables>;
export const CreateNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}]}]}}]} as unknown as DocumentNode<CreateNovelMutation, CreateNovelMutationVariables>;
export const UpdateNovelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNovel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNovel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}]}]}}]} as unknown as DocumentNode<UpdateNovelMutation, UpdateNovelMutationVariables>;
export const CreateChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"novelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"novelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"chapterNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterNumber"}}}]}]}}]} as unknown as DocumentNode<CreateChapterMutation, CreateChapterMutationVariables>;
export const ReorderChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reorder"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChapterReorder"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reorder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reorder"}}}]}]}}]} as unknown as DocumentNode<ReorderChaptersMutation, ReorderChaptersMutationVariables>;
export const UpdateChapterTitleAndTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateChapterTitleAndText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChapterTitleAndText"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<UpdateChapterTitleAndTextMutation, UpdateChapterTitleAndTextMutationVariables>;
export const DeleteChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}}]}]}}]} as unknown as DocumentNode<DeleteChapterMutation, DeleteChapterMutationVariables>;