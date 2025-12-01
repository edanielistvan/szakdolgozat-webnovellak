import { deleteChapterMutation } from "@/api/writer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

interface ChapterType {
  __typename?: "Chapter" | undefined;
  id: string;
  number?: number | null | undefined;
  title?: string | null | undefined;
}

export function ChapterRow({
  chapter,
  novelId,
  userId,
}: {
  chapter: ChapterType;
  novelId: string;
  userId: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.number ?? 0 });

  const queryClient = useQueryClient();

  const deleteChapter = useMutation(deleteChapterMutation);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b">
      <td className="p-2 cursor-grab" {...attributes} {...listeners}>
        ☰
      </td>

      <td className="p-2 font-bold">{chapter.number}</td>
      <td className="p-2">{chapter.title}</td>

      <td className="p-2">
        <Link
          to={"/publish/$userId/novel/$novelId/chapter/$chapterId"}
          params={{ userId: userId, novelId: novelId, chapterId: chapter.id }}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>
      </td>

      <td className="p-2">
        <button
          onClick={() =>
            deleteChapter.mutate(
              {
                chapterId: chapter.id,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["getNovel", novelId],
                  });
                },
              }
            )
          }
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
