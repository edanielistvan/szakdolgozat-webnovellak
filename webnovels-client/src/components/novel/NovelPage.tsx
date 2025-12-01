import { CSRFTokenQuery } from "@/api/authentication";
import {
  addFavouriteMutation,
  getNovelQuery,
  isFavouriteQuery,
  removeFavouriteMutation,
} from "@/api/novels";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { RatingControls } from "./RatingControls";
import { NovelComments } from "./NovelComments";
import { Star, StarOff } from "lucide-react";

export function NovelPage() {
  const { id } = useParams({ from: "/novels/$id" });
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const { data, isSuccess, error } = useQuery({
    queryKey: getNovelQuery.queryKey(id),
    queryFn: getNovelQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const {
    data: isFavouriteData,
    isSuccess: isFavouriteSuccess,
    error: isFavouriteError,
  } = useQuery({
    queryKey: isFavouriteQuery.queryKey(id),
    queryFn: isFavouriteQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const addFavourite = useMutation(addFavouriteMutation);
  const removeFavourite = useMutation(removeFavouriteMutation);

  const starPercentage = ((data?.getNovel.rating ?? 0) / 10) * 100;

  const doFavourite = () => {
    console.log(isFavouriteData?.isFavourite.valueOf());

    if (!isFavouriteData?.isFavourite.valueOf()) {
      addFavourite.mutate(
        { novelId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["IsNovelFavourite", id],
            });
          },
        }
      );
    } else {
      removeFavourite.mutate(
        { novelId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["IsNovelFavourite", id],
            });
          },
        }
      );
    }
  };

  if (error)
    return <p className="text-red-600">Error loading novel: {error.message}</p>;
  if (isFavouriteError)
    return (
      <p className="text-red-600">
        Error loading favourite: {isFavouriteError.message}
      </p>
    );
  if (!isSuccess || !isFavouriteSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div
      className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg 
                            transition-shadow duration-300 w-auto h-auto bg-white dark:bg-gray-900 self-start mt-4"
    >
      <div className="flex flex-row p-4 items-start">
        <img
          className="max-w-50 h-auto object-cover self-center"
          src={data.getNovel.image ?? ""}
          alt={data.getNovel.title}
        />
        <div className="pl-4 flex flex-col items-start justify-start">
          <h2 className="text-md font-bold text-gray-900 dark:text-gray-100">
            {data.getNovel.title}
          </h2>
          <p className="text-sm text-gray-500">
            by{" "}
            <Link to={"/user/" + data.getNovel.user?.id}>
              {data.getNovel.user?.name}
            </Link>
          </p>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            {data.getNovel.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 
                                text-gray-800 dark:text-gray-200"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-900 dark:text-gray-100 p-2 max-w-70">
            {data.getNovel.description}
          </p>
        </div>

        <div className="pl-4 flex flex-col items-start justify-start">
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
              {data.getNovel.rating}/10
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {(data.getNovel.reads ?? 0).toLocaleString()} reads
          </p>
          <RatingControls id={id} />
        </div>

        <div>
          <button
            onClick={doFavourite}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition"
            title="Add to favourites"
          >
            {isFavouriteData.isFavourite.valueOf() ? (
              <StarOff className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <Star className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col p-4 m-4 items-start border-gray-200 dark:border-gray-700 border gap-2">
        <h2 className="text-md font-bold text-gray-900 dark:text-gray-100">
          Chapters
        </h2>
        {data.getNovel.chapters.map((chapter, index) => (
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

      <NovelComments novelId={id} />
    </div>
  );
}
