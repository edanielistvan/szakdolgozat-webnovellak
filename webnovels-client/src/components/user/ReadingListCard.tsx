import type { UserReadingList } from "@/graphql/graphql";
import { Link } from "@tanstack/react-router";

export function ReadingListCard({ readList }: { readList: UserReadingList }) {
  return (
    <div
      className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg 
                        transition-shadow duration-300 w-auto h-auto"
    >
      <div className="flex flex-row p-4 items-start">
        <div className="flex flex-col">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Novel:{" "}
            <Link
              className="hover:text-blue-500 transition-colors"
              to={"/novels/" + readList.novel_id}
            >
              {readList.novel_title}
            </Link>
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Chapter:{" "}
            <Link
              className="hover:text-blue-500 transition-colors"
              to={
                "/novels/" +
                readList.novel_id +
                "/chapter/" +
                readList.chapter_id
              }
            >
              {readList.chapter_title} ({readList.chapter_number} /{" "}
              {readList.chapters_max})
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
