import { useState, useMemo, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateChapterTitleAndTextMutation } from "@/api/writer";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getChapterQuery } from "@/api/novels";
import { CSRFTokenQuery } from "@/api/authentication";

export function ChapterEdit() {
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const { novelId, chapterId } = useParams({
    from: "/publish/$userId/novel/$novelId/chapter/$chapterId",
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: chapterData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: getChapterQuery.queryKey(chapterId),
    queryFn: getChapterQuery.queryFn,
    enabled: !!chapterId && isTokenSuccess,
  });

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useMemo(() => {
    if (chapterData) {
      setTitle(chapterData.getChapter.title || "");
      setText(chapterData.getChapter.text || "");
    }
  }, [chapterData]);

  const updateChapter = useMutation(updateChapterTitleAndTextMutation);

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["link"], ["clean"]],
  };

  const handleAutosave = useCallback(() => {
    if (updateChapter.isPending || !chapterId) {
      return;
    }

    updateChapter.mutate({
      chapterId: chapterId,
      title: title,
      text: text,
    });
  }, [title, text, chapterId, updateChapter, queryClient]);

  useEffect(() => {
    if (chapterData) {
      // Only start the timer once the data is loaded
      const intervalId = setInterval(handleAutosave, 30000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [chapterData, handleAutosave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chapterId || !title || !text) return;

    updateChapter.mutate(
      {
        chapterId: chapterId,
        title: title,
        text: text,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getChapter", chapterId],
          });
          navigate({
            to: `/publish/${
              chapterData?.getChapter.novel.user!.id
            }/novel/${novelId}`,
          });
        },
      }
    );
  };

  if (isLoading)
    return <div className="text-center p-8">Loading chapter data...</div>;
  if (isError)
    return (
      <div className="text-center p-8 text-red-600">Error loading chapter.</div>
    );
  if (!chapterData)
    return <div className="text-center p-8">Chapter not found.</div>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Edit Chapter {chapterData.getChapter.number}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Chapter Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </div>

        {/* WYSIWYG Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chapter Text
          </label>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            modules={modules}
            className="h-96 pb-12 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: `/publish/${
                  chapterData?.getChapter.novel.user!.id
                }/novel/${novelId}`,
              })
            }
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateChapter.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-400 transition"
          >
            {updateChapter.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
