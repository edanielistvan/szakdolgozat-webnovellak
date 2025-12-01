import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { updateNovelMutation } from "@/api/writer";
import { CSRFTokenQuery } from "@/api/authentication";
import { getNovelQuery } from "@/api/novels";
import { ChapterList } from "./ChapterList";

export function PublishEditPage() {
  const { userId, novelId } = useParams({
    from: "/publish/$userId/novel/$novelId",
  });
  const queryClient = useQueryClient();

  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: getNovelQuery.queryKey(novelId),
    queryFn: getNovelQuery.queryFn,
    enabled: !!novelId && isTokenSuccess,
  });

  useEffect(() => {
    if (isSuccess) {
      setTitle(data?.getNovel.title ?? "");
      setImage(data?.getNovel.image ?? "");
      setDescription(data?.getNovel.description ?? "");
      setTags(data?.getNovel.tags.map((t) => t.name).join(","));
    }
  }, [isLoading]);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const updateNovel = useMutation({
    mutationKey: updateNovelMutation.mutationKey,
    mutationFn: updateNovelMutation.mutationFn,
  });

  if (isLoading)
    return (
      <p className="text-gray-900 dark:text-gray-100">Loading novels...</p>
    );
  if (error)
    return (
      <p className="text-gray-900 dark:text-gray-100">
        Error loading the novel.
      </p>
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateNovel.mutate(
      {
        novelId,
        title,
        image,
        description,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getNovel", novelId] });
          queryClient.invalidateQueries({
            queryKey: ["getAuthorNovels", userId],
          });
          //navigate({ to: "/publish/" + userId });
        },
      }
    );
  };

  return (
    <div className="flex flex-row w-screen h-screen p-4 gap-6 bg-500">
      <div className="w-full p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow rounded">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Edit Novel
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-4">
            <Link
              to={"/publish/" + userId}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back
            </Link>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="w-full p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow rounded">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Chapters
        </h1>

        <ChapterList
          novelId={novelId}
          userId={userId}
          chapters={data?.getNovel.chapters ?? []}
        />
      </div>
    </div>
  );
}
