import type { NovelCardListProps } from "@/types/novel";
import { NovelCard } from "./NovelCard";

export function NovelCardList({ heading, novels }: NovelCardListProps) {
  return (
    <section className="my-8 relative">
      <div
        className="flex flex-col border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                     p-4 border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600
                     dark:scrollbar-track-gray-700 max-w-md"
      >
        <h3 className="relative text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4 z-10">
          {heading}
        </h3>
        <div className="flex flex-col space-y-4 overflow-x-auto">
          {novels.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 relative z-10">
              No novels to display.
            </p>
          ) : (
            <>
              {novels.map((novel, index) => (
                <NovelCard key={index} {...novel} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
