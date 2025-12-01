import { useState, useMemo } from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookmarkPlus,
  Quote as QuoteIcon,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmarkMutation, createQuoteMutation } from "@/api/novels";

interface BookType {
  novelId: string;
  chapterId: string;
  title: string;
  number: number;
  text: string;
  prevLink: string;
  nextLink: string;
}

export default function ChapterBook({
  novelId,
  chapterId,
  title,
  number,
  text,
  prevLink,
  nextLink,
}: BookType) {
  const cleanText = DOMPurify.sanitize(text ?? "");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const pages = useMemo(() => {
    const CHARS_PER_PAGE = 1400;
    const chunks = [];
    for (let i = 0; i < cleanText.length; i += CHARS_PER_PAGE) {
      chunks.push(cleanText.slice(i, i + CHARS_PER_PAGE));
    }
    return chunks;
  }, [cleanText]);

  const createBookmark = useMutation({
    mutationKey: createBookmarkMutation.mutationKey(novelId, chapterId),
    mutationFn: createBookmarkMutation.mutationFn,
  });

  const createQuote = useMutation({
    mutationKey: createQuoteMutation.mutationKey({
      novel_id: novelId,
      chapter_id: chapterId,
      quote: "",
      chapter_number: number,
    }),
    mutationFn: createQuoteMutation.mutationFn,
  });

  const [index, setIndex] = useState(0);

  const goPrev = () => {
    if (index === 0) {
      if (prevLink) navigate({ to: prevLink });
      return;
    }
    setIndex(index - 2);
  };

  const goNext = () => {
    if (index + 2 >= pages.length) {
      if (nextLink) navigate({ to: nextLink });
      return;
    }
    setIndex(index + 2);
  };

  const doBookmark = () => {
    createBookmark.mutate(
      {
        novelId: novelId,
        chapterId: chapterId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getBookmark"] });
        },
      }
    );
  };

  const doQuote = () => {
    const selected = window.getSelection()?.toString();

    if (!selected) {
      return;
    }

    createQuote.mutate({
      novelId: novelId,
      chapterId: chapterId,
      quote: selected,
      chapter_number: number,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-xl relative">
      {/* Top-right action buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={doBookmark}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition"
          title="Create Bookmark"
        >
          <BookmarkPlus className="w-5 h-5" />
        </button>

        <button
          onClick={doQuote}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition"
          title="Save Quote"
        >
          <QuoteIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Chapter title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        {number}. {title}
      </h1>

      {/* Book layout */}
      <div className="relative flex flex-row gap-6">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-600 hover:text-blue-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Book pages */}
        <div className="flex flex-row border rounded-lg overflow-hidden shadow-lg">
          {/* Left Page */}
          <div className="w-full p-6 bg-amber-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div dangerouslySetInnerHTML={{ __html: pages[index] ?? "" }} />
          </div>

          {/* Spine */}
          <div className="w-1 bg-gray-400 dark:bg-gray-600" />

          {/* Right Page */}
          <div className="w-full p-6 bg-amber-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div dangerouslySetInnerHTML={{ __html: pages[index + 1] ?? "" }} />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-600 hover:text-blue-500"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
