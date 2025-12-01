import { CSRFTokenQuery } from "@/api/authentication";
import { deleteNovelMutation, getAuthorNovelsQuery } from "@/api/writer";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { Plus, Pencil, Trash } from "lucide-react";

export default function PublishPage() {
  const queryClient = useQueryClient();

  const authorId = useParams({ from: "/publish/$userId" });

  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const { data, isLoading, error } = useQuery({
    queryKey: getAuthorNovelsQuery.queryKey(authorId.userId),
    queryFn: getAuthorNovelsQuery.queryFn,
    enabled: isTokenSuccess,
  });

  const deleteNovel = useMutation({
    mutationKey: deleteNovelMutation.mutationKey,
    mutationFn: deleteNovelMutation.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAuthorNovels", authorId.userId],
      });
    },
  });

  if (isLoading)
    return (
      <p className="text-gray-900 dark:text-gray-100">Loading novels...</p>
    );
  if (error)
    return (
      <p className="text-gray-900 dark:text-gray-100">Error loading novels.</p>
    );

  return (
    <div className="p-6 w-screen h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Novels
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Link
          to={"/publish/" + authorId.userId + "/novel/new"}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 align-middle"
        >
          <div className="block mx-auto align-middle">
            <Plus className="w-5 h-5 block mx-auto" />
            <p>Add New</p>
          </div>
        </Link>
        {data?.getAuthorNovels.map((novel) => (
          <div
            key={novel.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg flex flex-col"
          >
            <img
              src={novel.image ?? ""}
              alt={novel.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {novel.title}
              </h2>
              <div className="flex justify-between mt-4">
                <Link
                  to={"/publish/" + authorId.userId + "/novel/" + novel.id}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </Link>
                <button
                  onClick={() => deleteNovel.mutate(novel.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <Trash className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
