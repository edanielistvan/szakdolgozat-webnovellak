import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ChapterRow } from "./ChapterRow";
import { createChapterMutation, reorderChaptersMutation } from "@/api/writer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChapterType {
  __typename?: "Chapter" | undefined;
  id: string;
  number?: number | null | undefined;
  title?: string | null | undefined;
}

export function ChapterList({
  novelId,
  userId,
  chapters,
}: {
  novelId: string;
  userId: string;
  chapters: ChapterType[];
}) {
  const queryClient = useQueryClient();

  const reorderChapters = useMutation(reorderChaptersMutation);
  const createChapter = useMutation(createChapterMutation);

  const nextChapterNumber =
    chapters.length > 0
      ? Math.max(...chapters.map((c) => c.number || 0)) + 1
      : 1;

  const handleAddChapter = () => {
    createChapter.mutate(
      {
        novelId: novelId,
        chapterNumber: nextChapterNumber,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getNovel", novelId] });
        },
        onError: (error) => {
          console.error("Failed to create chapter:", error);
        },
      }
    );
  };

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = chapters.findIndex((c) => c.number === active.id);
      const newIndex = chapters.findIndex((c) => c.number === over.id);
      const newList = arrayMove(chapters, oldIndex, newIndex);

      const updatedList = newList.map((chapter, index) => ({
        ...chapter,
        number: index + 1,
      }));

      reorderChapters.mutate(
        {
          reorder: updatedList.map((chapter) => ({
            id: chapter.id,
            novelId: novelId,
            number: chapter.number as number, // Ensure number is treated as a number
          })),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getNovel", novelId] });
          },
        }
      );
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chapters</h2>

        <button
          onClick={handleAddChapter}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={createChapter.isPending}
        >
          {createChapter.isPending ? "Adding..." : "+ Add Chapter"}
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={chapters.map((i) => i.number ?? 0)}
          strategy={verticalListSortingStrategy}
        >
          <table className="w-full border">
            <tbody>
              {chapters.map((chapter) => (
                <ChapterRow
                  key={chapter.number}
                  chapter={chapter}
                  novelId={novelId}
                  userId={userId}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
