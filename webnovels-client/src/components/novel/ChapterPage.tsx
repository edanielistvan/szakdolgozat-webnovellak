import { CSRFTokenQuery } from "@/api/authentication";
import {
  getBookmarkQuery,
  getChapterQuery,
  incrementReadsMutation,
  updateReadingListMutation,
} from "@/api/novels";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import ChapterBook from "./ChapterBook";
import { useMemo } from "react";

export function ChapterPage() {
  const { id, chapterId } = useParams({
    from: "/novels/$id/chapter/$chapterId",
  });
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const { data, isSuccess, error } = useQuery({
    queryKey: getChapterQuery.queryKey(chapterId),
    queryFn: getChapterQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const {
    data: bookmarkData,
    isSuccess: bookmarkSuccess,
    error: bookmarkError,
  } = useQuery({
    queryKey: getBookmarkQuery.queryKey(id),
    queryFn: getBookmarkQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const updateReadList = useMutation(updateReadingListMutation);
  const incrementReads = useMutation(incrementReadsMutation);

  useMemo(() => {
    if (!isSuccess) return;

    incrementReads.mutate({ novelId: data?.getChapter.novel.id! });
    updateReadList.mutate({
      value: {
        chapter_id: chapterId,
        novel_id: data?.getChapter.novel.id!,
      },
    });
  }, [chapterId, isSuccess]);

  const starPercentage = ((data?.getChapter.novel.rating ?? 0) / 10) * 100;
  const cat_image =
    "https://hips.hearstapps.com/hmg-prod/images/cutest-cat-breeds-ragdoll-663a8c6d52172.jpg";

  if (error)
    return (
      <p className="text-red-600">Error loading chapter: {error.message}</p>
    );
  if (bookmarkError)
    return (
      <p className="text-red-600">
        Error loading bookmark: {bookmarkError.message}
      </p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  const prevs = data?.getChapter.novel.chapters
    .filter((c) => c.number! < data.getChapter.number!)
    .sort((a, b) => b.number! - a.number!);
  const nexts = data?.getChapter.novel.chapters
    .filter((c) => c.number! > data.getChapter.number!)
    .sort((a, b) => a.number! - b.number!);

  const prevLink =
    prevs.length == 0 ? "" : "/novels/" + id + "/chapter/" + prevs[0].id;
  const nextLink =
    nexts.length == 0 ? "" : "/novels/" + id + "/chapter/" + nexts[0].id;

  return (
    <div className="flex flex-row gap-4 items-start  h-screen w-screen m-4">
      <div className="flex flex-col gap-4">
        <div
          className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg max-w-250
                                transition-shadow duration-300 w-auto h-auto bg-white dark:bg-gray-900 self-start mt-4"
        >
          <div className="flex flex-row p-4">
            <img
              className="max-w-50 h-auto object-cover self-center"
              src={cat_image}
              alt={data.getChapter.novel.title}
            />
            <div className="pl-4 flex flex-col items-start justify-center">
              <h2 className="text-md font-bold text-gray-900 dark:text-gray-100">
                <Link to={"/novels/" + id}>{data.getChapter.novel.title}</Link>
              </h2>
              <p className="text-sm text-gray-500">
                by{" "}
                <Link to={"/user/" + data.getChapter.novel.user?.id}>
                  {data.getChapter.novel.user?.name}
                </Link>
              </p>
              <div className="mt-2">
                <div className="relative w-30 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${starPercentage}%`,
                      background: "linear-gradient(90deg, #FFD700, #FFA500)",
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 mt-1 block">
                  {data.getChapter.novel.rating}/10
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg max-w-250
                                transition-shadow duration-300 w-full h-auto bg-white dark:bg-gray-900 self-start mt-4"
        >
          {!bookmarkSuccess ? (
            <></>
          ) : (
            <p
              className="text-sm text-gray-900 dark:text-gray-100 p-2 w-full 
                                                border-gray-200 dark:border-gray-700 border hover:text-blue-500"
            >
              <Link
                to={
                  "/novels/" +
                  id +
                  "/chapter/" +
                  bookmarkData?.getBookmark?.chapter_id
                }
              >
                Bookmark
              </Link>
            </p>
          )}
          {data.getChapter.novel.chapters.map((chapter, index) => (
            <p
              key={index}
              className="text-sm text-gray-900 dark:text-gray-100 p-2 w-full 
                                                    border-gray-200 dark:border-gray-700 border hover:text-blue-500"
            >
              <Link to={"/novels/" + id + "/chapter/" + chapter.id}>
                {chapter.number}. {chapter.title}
              </Link>
            </p>
          ))}
        </div>
      </div>
      <ChapterBook
        title={data.getChapter.title!}
        number={data.getChapter.number!}
        text={data.getChapter.text!}
        prevLink={prevLink}
        nextLink={nextLink}
        novelId={id}
        chapterId={chapterId}
      />
    </div>
  );
}
