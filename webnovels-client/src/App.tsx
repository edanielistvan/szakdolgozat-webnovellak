import { useQuery } from "@tanstack/react-query";
import {
  longestWebnovelsQuery,
  mostLikedWebnovelsQuery,
  mostReadWebnovelsQuery,
} from "./api/mainPageLists";
import { NovelCardList } from "@/components/common/NovelCardList";

function App() {
  const {
    data: mostReadData,
    isPending: isMostReadPending,
    error: mostReadError,
  } = useQuery(mostReadWebnovelsQuery);
  const {
    data: longestData,
    isPending: isLongestPending,
    error: longestError,
  } = useQuery(longestWebnovelsQuery);
  const {
    data: mostLikedData,
    isPending: isMostLikedPending,
    error: mostLikedError,
  } = useQuery(mostLikedWebnovelsQuery);

  if (mostReadError)
    return (
      <p className="text-red-600">
        Error loading most read web novels: {mostReadError.message}
      </p>
    );

  if (longestError)
    return (
      <p className="text-red-600">
        Error loading longest web novels: {longestError.message}
      </p>
    );

  if (mostLikedError)
    return (
      <p className="text-red-600">
        Error loading most liked web novels: {mostLikedError.message}
      </p>
    );

  return (
    <>
      {isMostReadPending ? (
        "Loading..."
      ) : (
        <NovelCardList
          heading="Most Read Novels"
          novels={mostReadData?.mostReadWebnovels ?? []}
        />
      )}
      {isLongestPending ? (
        "Loading..."
      ) : (
        <NovelCardList
          heading="Longest Novels"
          novels={longestData?.longestWebnovels ?? []}
        />
      )}
      {isMostLikedPending ? (
        "Loading..."
      ) : (
        <NovelCardList
          heading="Most Liked Novels"
          novels={mostLikedData?.mostLikedWebnovels ?? []}
        />
      )}
    </>
  );
}

export default App;
