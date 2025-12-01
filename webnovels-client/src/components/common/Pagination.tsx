import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: any;
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex flex-row">
            <button
              className="join-item btn btn-sm btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="text-gray-900 dark:text-gray-100" />
            </button>

            <div className="flex flex-row gap-2 m-2">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`join-item btn btn-sm ${
                    currentPage === page ? "" : "hover:text-blue-500"
                  } text-gray-700 dark:text-gray-300 self-center justify-center ${
                    currentPage === page ? "underline" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="join-item btn btn-sm btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="text-gray-900 dark:text-gray-100" />
            </button>
          </div>
        </div>
      )}
      ;
    </>
  );
}
