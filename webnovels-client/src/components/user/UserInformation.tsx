import { CSRFTokenQuery } from "@/api/authentication";
import { requestWriterRoleMutation, userProfileQuery } from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { NovelCardList } from "../common/NovelCardList";
import { useAuth } from "@/context/AuthContext";

export function UserInformation() {
  const { id } = useParams({ from: "/user/$id" });
  const { user } = useAuth();

  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const { data, isSuccess, error } = useQuery({
    queryKey: userProfileQuery.queryKey(id),
    queryFn: userProfileQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  const requestWriter = useMutation({
    mutationKey: requestWriterRoleMutation.mutationKey,
    mutationFn: requestWriterRoleMutation.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  if (error)
    return (
      <p className="text-red-600">Error loading quotes list: {error.message}</p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div className="flex flex-col gap-4 self-start p-4">
      <div
        className="flex flex-col border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                    p-4 border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600
                    dark:scrollbar-track-gray-700"
      >
        <h3 className="relative text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4 z-10">
          {data.userProfile.user?.name ?? ""}
        </h3>
        <div className="flex flex-col space-y-4 overflow-x-auto">
          <p className="text-gray-900 dark:text-gray-100">
            Email: {data.userProfile.user?.email ?? ""}
          </p>
          <div className="flex flex-row items-center gap-4">
            <p className="text-gray-900 dark:text-gray-100">
              Role: {data.userProfile.user?.role ?? ""}
            </p>
            {!data.userProfile.is_writer &&
            user?.id == data.userProfile.user?.id &&
            data.userProfile.user?.role != "admin" &&
            !data.userProfile.user?.writer_request ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded"
                onClick={() => requestWriter.mutate()}
              >
                Request to become writer
              </button>
            ) : (
              <></>
            )}
          </div>
          <p className="text-gray-900 dark:text-gray-100">
            Member since: {data.userProfile.user?.created_at ?? ""}
          </p>
        </div>
      </div>
      <div
        className="flex flex-row border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                    p-4 border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600
                    dark:scrollbar-track-gray-700 gap-4 justify-center"
      >
        <NovelCardList
          heading="Favourites"
          novels={data.userProfile.favourites}
        />
        {data.userProfile.is_writer ? (
          <NovelCardList heading="Novels" novels={data.userProfile.novels} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
