import { CSRFTokenQuery } from "@/api/authentication";
import { createCommentMutation, getCommentsQuery } from "@/api/novels";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentCard } from "./CommentCard";
import { useState } from "react";

export function NovelComments({ novelId }: { novelId: string }) {
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState("");

  const { data, isSuccess, error } = useQuery({
    queryKey: getCommentsQuery.queryKey(novelId),
    queryFn: getCommentsQuery.queryFn,
    enabled: !!novelId && isTokenSuccess,
  });

  const createComment = useMutation({
    mutationKey: createCommentMutation.mutationKey(novelId, null, newComment),
    mutationFn: createCommentMutation.mutationFn,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment.mutate(
      {
        novelId: novelId,
        parentId: null,
        text: newComment,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getComments"] });
          setNewComment("");
        },
      }
    );
  };

  if (error)
    return <p className="text-gray-900 dark:text-gray-100">{error.message}</p>;
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  return (
    <div className="flex flex-col p-4 m-4 items-start border-gray-200 dark:border-gray-700 border gap-2">
      <h2 className="text-md font-bold text-gray-900 dark:text-gray-100">
        Comments
      </h2>

      {/* Input comment */}
      <form onSubmit={handleSubmit} className="w-full flex gap-2 mt-2 mb-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </form>

      {/* List of comments */}
      {data.getComments.map((comment, index) => (
        <CommentCard
          key={index}
          novelId={novelId}
          comment={comment}
          allowReply={true}
        />
      ))}
    </div>
  );
}
