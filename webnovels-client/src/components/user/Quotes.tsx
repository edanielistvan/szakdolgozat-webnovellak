import { CSRFTokenQuery } from "@/api/authentication";
import { userQuotesQuery } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Pagination } from "../common/Pagination";

const ITEMS_PER_PAGE = 10;

export function Quotes() {
  const { id } = useParams({ from: "/quotes/$id" });
  const { isSuccess: isTokenSuccess } = useQuery(CSRFTokenQuery);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, error } = useQuery({
    queryKey: userQuotesQuery.queryKey(id),
    queryFn: userQuotesQuery.queryFn,
    enabled: !!id && isTokenSuccess,
  });

  if (error)
    return (
      <p className="text-red-600">Error loading quotes list: {error.message}</p>
    );
  if (!isSuccess)
    return <p className="text-gray-900 dark:text-gray-100">Loading...</p>;

  const fullList = data.userQuotes;
  const totalItems = fullList.length;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentItems = fullList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className="flex flex-col border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                            p-4 border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600
                            dark:scrollbar-track-gray-700 self-start mt-4"
    >
      <h3 className="relative text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4 z-10">
        Quotes
      </h3>
      <div className="flex flex-col gap-2">
        {currentItems.map((quote, index) => (
          <div
            key={index}
            className="border-gray-200 dark:border-gray-700 border shadow-md overflow-hidden hover:shadow-lg 
                        transition-shadow duration-300 w-auto h-auto flex flex-col p-4 items-start"
          >
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              "{quote.quote}"
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              - {quote.novel.title}, {quote.chapter.number}.{" "}
              {quote.chapter.title}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
