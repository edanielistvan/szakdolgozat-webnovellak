import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { createNovelMutation } from "@/api/writer";
import { CSRFTokenQuery } from "@/api/authentication";

export function PublishNewPage() {
  const { userId } = useParams({ from: "/publish/$userId/novel/new" });

  useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const createNovel = useMutation({
    mutationKey: createNovelMutation.mutationKey,
    mutationFn: createNovelMutation.mutationFn,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("HAI");

    createNovel.mutate(
      {
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
          console.log("SUCC");
          queryClient.invalidateQueries({
            queryKey: ["getAuthorNovels", userId],
          });
          navigate({ to: "/publish/" + userId });
        },
      }
    );
  };

  return (
    <div className="w-screen h-screen">
      <div className="max-w-3xl ml-4 mt-4 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow rounded">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Publish New Novel
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
              Cancel
            </Link>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
