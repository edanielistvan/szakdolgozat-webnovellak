import { reportCommentMutation } from "@/api/admin";
import { CSRFTokenQuery } from "@/api/authentication";
import {
  createCommentMutation,
  doVoteMutation,
  removeVoteMutation,
} from "@/api/novels";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, CornerUpLeft, Flag } from "lucide-react";
import { useState } from "react";

interface CommentType {
  __typename?: "Comment" | undefined;
  id: string;
  text: string;
  upvotes: number;
  downvotes: number;
  user: {
    __typename?: "User" | undefined;
    id: string;
    name: string;
  };
  userVote: number;
  replies:
    | {
        __typename?: "Comment" | undefined;
        id: string;
        text: string;
        upvotes: number;
        downvotes: number;
        user: {
          __typename?: "User" | undefined;
          id: string;
          name: string;
        };
        userVote: number;
      }[]
    | null;
}

export function CommentCard({
  novelId,
  comment,
  allowReply,
}: {
  novelId: string;
  comment: CommentType;
  allowReply: boolean;
}) {
  useQuery(CSRFTokenQuery);
  const queryClient = useQueryClient();

  const [replyOpen, setReplyOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const createComment = useMutation({
    mutationKey: createCommentMutation.mutationKey(
      novelId,
      comment.id,
      newComment
    ),
    mutationFn: createCommentMutation.mutationFn,
  });

  const doUpvote = useMutation({
    mutationKey: doVoteMutation.mutationKey(comment.id, 1),
    mutationFn: doVoteMutation.mutationFn,
  });

  const doDownvote = useMutation({
    mutationKey: doVoteMutation.mutationKey(comment.id, -1),
    mutationFn: doVoteMutation.mutationFn,
  });

  const doRemoveVote = useMutation({
    mutationKey: removeVoteMutation.mutationKey(comment.id),
    mutationFn: removeVoteMutation.mutationFn,
  });

  const report = useMutation({
    mutationKey: reportCommentMutation.mutationKey(comment.id),
    mutationFn: reportCommentMutation.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments", novelId] });
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createComment.mutate(
      {
        novelId: novelId,
        parentId: comment.id,
        text: newComment,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getComments", novelId] });
          setNewComment("");
          setReplyOpen(false);
        },
      }
    );
  };

  const upvote = () => {
    console.log("UPVOTE");

    doUpvote.mutate(
      {
        commentId: comment.id,
        value: 1,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getComments", novelId] });
        },
      }
    );
  };

  const downvote = () => {
    doDownvote.mutate(
      {
        commentId: comment.id,
        value: -1,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getComments", novelId] });
        },
      }
    );
  };

  const removeVote = () => {
    doRemoveVote.mutate(comment.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getComments", novelId] });
      },
    });
  };

  return (
    <div className="border-gray-200 dark:border-gray-700 border p-4 w-full text-wrap">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-blue-500">
        <Link to={"/user/" + comment.user.id}>{comment.user.name}</Link>
      </h3>
      <p className="text-sm text-gray-900 dark:text-gray-100 p-2 ">
        {comment.text}
      </p>
      <div className="justify-between flex flex-row gap-2 ">
        <div className="flex flex-row gap-2">
          <button
            onClick={() => {
              if (comment.userVote == 1) {
                removeVote();
              } else if (comment.userVote == 0) {
                upvote();
              }
            }}
          >
            <ArrowUp
              className={
                "self-center w-5 h-5 " +
                (comment.userVote == -1 ? "text-gray-500" : "text-green-500")
              }
            />
          </button>
          <p className="text-gray-900 dark:text-gray-100 self-center">
            {comment.upvotes - comment.downvotes}
          </p>
          <button
            onClick={() => {
              if (comment.userVote == -1) {
                removeVote();
              } else if (comment.userVote == 0) {
                downvote();
              }
            }}
          >
            <ArrowDown
              className={
                "self-center w-5 h-5 " +
                (comment.userVote == 1 ? "text-gray-500" : "text-red-500")
              }
            />
          </button>
        </div>

        <p className="text-white">{comment.userVote}</p>

        <div className="flex flex-row gap-4">
          {allowReply ? (
            <button
              onClick={() => setReplyOpen((prev) => !prev)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
            >
              <CornerUpLeft className="w-4 h-4" />
              Reply
            </button>
          ) : (
            <></>
          )}
          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
            onClick={() => report.mutate(comment.id)}
          >
            <Flag className="w-4 h-4" />
            Report
          </button>
        </div>
      </div>

      {replyOpen && (
        <form
          onSubmit={handleReplySubmit}
          className="w-full flex gap-2 mt-2 mb-2"
        >
          <input
            type="text"
            className="flex-1 p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Add a reply..."
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
      )}

      <div className="flex flex-col gap-2 mt-2">
        {allowReply ? (
          comment.replies?.map((comment, index) => (
            <CommentCard
              key={index}
              novelId={novelId}
              comment={{
                ...comment,
                replies: null,
              }}
              allowReply={false}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
